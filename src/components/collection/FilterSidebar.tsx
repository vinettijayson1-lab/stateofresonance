'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  sizes: string[];
}

export default function FilterSidebar({ categories, sizes }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    size: true,
  });

  const toggleSection = (section: 'category' | 'size') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedSizes.length > 0;

  return (
    <div className="space-y-8">
      {/* Active filters */}
      {hasActiveFilters && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium tracking-[0.1em] uppercase text-[#737373]">
              Active Filters
            </span>
            <button 
              onClick={clearFilters}
              className="text-xs text-[#a3a3a3] hover:text-[#fafafa] transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#1a1a1a] text-[#fafafa] text-xs"
              >
                {cat}
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedSizes.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#1a1a1a] text-[#fafafa] text-xs"
              >
                {size}
                <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      {categories.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full py-3 border-b border-[#1a1a1a]"
          >
            <span className="text-xs font-medium tracking-[0.1em] uppercase text-[#fafafa]">
              Category
            </span>
            <ChevronDown 
              className={`w-4 h-4 text-[#737373] transition-transform ${
                expandedSections.category ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {expandedSections.category && (
            <div className="pt-4 space-y-3">
              {categories.map(category => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 border border-[#262626] bg-transparent checked:bg-[#fafafa] checked:border-[#fafafa] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-sm text-[#a3a3a3] group-hover:text-[#fafafa] transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Size filter */}
      {sizes.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('size')}
            className="flex items-center justify-between w-full py-3 border-b border-[#1a1a1a]"
          >
            <span className="text-xs font-medium tracking-[0.1em] uppercase text-[#fafafa]">
              Size
            </span>
            <ChevronDown 
              className={`w-4 h-4 text-[#737373] transition-transform ${
                expandedSections.size ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {expandedSections.size && (
            <div className="pt-4 flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-2 text-sm border transition-colors ${
                    selectedSizes.includes(size)
                      ? 'border-[#fafafa] bg-[#fafafa] text-[#0a0a0a]'
                      : 'border-[#262626] text-[#a3a3a3] hover:border-[#fafafa] hover:text-[#fafafa]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
