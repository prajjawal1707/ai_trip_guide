import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterBar = ({ filters, onFilterChange, onReset }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' }
  ];

  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search trips..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Filter by status"
        />

        <Select
          options={sortOptions}
          value={filters?.sort}
          onChange={(value) => onFilterChange('sort', value)}
          placeholder="Sort by"
        />

        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onReset}
          fullWidth
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;