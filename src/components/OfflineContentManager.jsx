import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const OfflineContentContext = createContext(null);

export const useOfflineContent = () => {
  const context = useContext(OfflineContentContext);
  if (!context) {
    throw new Error('useOfflineContent must be used within OfflineContentManager');
  }
  return context;
};

const OfflineContentManager = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cachedContent, setCachedContent] = useState({});
  const [syncQueue, setSyncQueue] = useState([]);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [cacheSize, setCacheSize] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      processSyncQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    loadCachedContent();
    registerServiceWorker();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker?.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  const loadCachedContent = useCallback(async () => {
    try {
      const keys = await caches.keys();
      const contentCache = await caches.open('app-content-v1');
      const requests = await contentCache?.keys();
      
      const cached = {};
      for (const request of requests) {
        const response = await contentCache?.match(request);
        if (response) {
          const data = await response?.json();
          cached[request.url] = data;
        }
      }
      
      setCachedContent(cached);
      calculateCacheSize();
    } catch (error) {
      console.error('Failed to load cached content:', error);
    }
  }, []);

  const calculateCacheSize = useCallback(async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage?.estimate();
        setCacheSize(estimate?.usage || 0);
      } catch (error) {
        console.error('Failed to estimate cache size:', error);
      }
    }
  }, []);

  const cacheContent = useCallback(async (key, data, options = {}) => {
    try {
      const cache = await caches.open('app-content-v1');
      const response = new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': options.maxAge ? `max-age=${options.maxAge}` : 'no-cache'
        }
      });
      
      await cache?.put(key, response);
      setCachedContent(prev => ({ ...prev, [key]: data }));
      calculateCacheSize();
      
      return true;
    } catch (error) {
      console.error('Failed to cache content:', error);
      return false;
    }
  }, [calculateCacheSize]);

  const getCachedContent = useCallback(async (key) => {
    if (cachedContent?.[key]) {
      return cachedContent?.[key];
    }

    try {
      const cache = await caches.open('app-content-v1');
      const response = await cache?.match(key);
      
      if (response) {
        const data = await response?.json();
        setCachedContent(prev => ({ ...prev, [key]: data }));
        return data;
      }
    } catch (error) {
      console.error('Failed to get cached content:', error);
    }
    
    return null;
  }, [cachedContent]);

  const removeCachedContent = useCallback(async (key) => {
    try {
      const cache = await caches.open('app-content-v1');
      await cache?.delete(key);
      setCachedContent(prev => {
        const updated = { ...prev };
        delete updated?.[key];
        return updated;
      });
      calculateCacheSize();
      return true;
    } catch (error) {
      console.error('Failed to remove cached content:', error);
      return false;
    }
  }, [calculateCacheSize]);

  const clearCache = useCallback(async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys?.map(key => caches.delete(key)));
      setCachedContent({});
      setCacheSize(0);
      return true;
    } catch (error) {
      console.error('Failed to clear cache:', error);
      return false;
    }
  }, []);

  const addToSyncQueue = useCallback((action) => {
    const queueItem = {
      id: `sync_${Date.now()}_${Math.random()}`,
      action,
      timestamp: Date.now(),
      retries: 0
    };
    
    setSyncQueue(prev => [...prev, queueItem]);
    
    const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    queue?.push(queueItem);
    localStorage.setItem('syncQueue', JSON.stringify(queue));
  }, []);

  const processSyncQueue = useCallback(async () => {
    if (!isOnline || syncQueue?.length === 0) return;

    const queue = [...syncQueue];
    const processed = [];
    const failed = [];

    for (const item of queue) {
      try {
        await item?.action();
        processed?.push(item?.id);
      } catch (error) {
        console.error('Sync failed for item:', item?.id, error);
        if (item?.retries < 3) {
          failed?.push({ ...item, retries: item?.retries + 1 });
        }
      }
    }

    setSyncQueue(failed);
    localStorage.setItem('syncQueue', JSON.stringify(failed));
    
    if (processed?.length > 0) {
      setLastSyncTime(Date.now());
    }
  }, [isOnline, syncQueue]);

  const prefetchContent = useCallback(async (urls) => {
    if (!isOnline) return;

    const cache = await caches.open('app-content-v1');
    const promises = urls?.map(async (url) => {
      try {
        const response = await fetch(url);
        if (response?.ok) {
          await cache?.put(url, response?.clone());
        }
      } catch (error) {
        console.error('Failed to prefetch:', url, error);
      }
    });

    await Promise.all(promises);
    calculateCacheSize();
  }, [isOnline, calculateCacheSize]);

  const value = {
    isOnline,
    cachedContent,
    syncQueue,
    lastSyncTime,
    cacheSize,
    cacheContent,
    getCachedContent,
    removeCachedContent,
    clearCache,
    addToSyncQueue,
    processSyncQueue,
    prefetchContent
  };

  return (
    <OfflineContentContext.Provider value={value}>
      {children}
    </OfflineContentContext.Provider>
  );
};

export default OfflineContentManager;