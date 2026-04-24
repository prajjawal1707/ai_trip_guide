import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OfflineMapManager = ({ maps, onDownload, onDelete, storageUsed, storageLimit }) => {
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024)?.toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024))?.toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024))?.toFixed(2)} GB`;
  };

  const storagePercentage = (storageUsed / storageLimit) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Offline Maps</h3>
        <p className="text-sm text-muted-foreground">Download maps for offline navigation</p>
      </div>
      <div className="p-4 rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Storage Used</span>
          <span className="text-sm text-muted-foreground">
            {formatSize(storageUsed)} / {formatSize(storageLimit)}
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(storagePercentage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {(100 - storagePercentage)?.toFixed(1)}% available
        </p>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Downloaded Maps</h4>
        {maps?.filter(map => map?.downloaded)?.length > 0 ? (
          <div className="space-y-3">
            {maps?.filter(map => map?.downloaded)?.map((map) => (
              <div key={map?.id} className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="MapPin" size={18} color="var(--color-primary)" />
                      <h5 className="font-medium text-foreground">{map?.name}</h5>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="HardDrive" size={14} />
                        <span>{formatSize(map?.size)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        <span>Downloaded {map?.downloadDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="RefreshCw" size={14} />
                        <span>Updated {map?.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onDownload(map?.id)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      aria-label="Update map"
                    >
                      <Icon name="RefreshCw" size={18} color="var(--color-primary)" />
                    </button>
                    <button
                      onClick={() => onDelete(map?.id)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      aria-label="Delete map"
                    >
                      <Icon name="Trash2" size={18} color="var(--color-error)" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 px-4 rounded-lg border border-dashed border-border">
            <Icon name="Download" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No offline maps downloaded yet</p>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Available for Download</h4>
        <div className="space-y-3">
          {maps?.filter(map => !map?.downloaded)?.map((map) => (
            <div key={map?.id} className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MapPin" size={18} color="var(--color-muted-foreground)" />
                    <h5 className="font-medium text-foreground">{map?.name}</h5>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="HardDrive" size={14} />
                      <span>{formatSize(map?.size)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Layers" size={14} />
                      <span>{map?.coverage}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownload(map?.id)}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-lg border border-border bg-muted/50">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Offline Map Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Download maps over Wi-Fi to save mobile data</li>
              <li>• Maps are automatically updated when connected to Wi-Fi</li>
              <li>• Offline maps work without internet connection</li>
              <li>• Delete unused maps to free up storage space</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineMapManager;