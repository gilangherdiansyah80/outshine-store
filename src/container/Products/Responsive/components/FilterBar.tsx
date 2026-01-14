import { ChevronDown } from "lucide-react";

interface FilterBarProps {
  onFilterClick?: () => void;
}

const FilterBar = ({ onFilterClick }: FilterBarProps) => {
  const filters = ["Size", "Color", "Price"];

  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
      {/* Main Filter Button */}
      <button
        onClick={onFilterClick}
        className="flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white rounded-lg text-sm font-medium whitespace-nowrap"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 3H14M4.66667 8H11.3333M7.33333 13H8.66667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Filters
      </button>

      {/* Filter Chips */}
      {filters.map((filter) => (
        <button
          key={filter}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#1F2937] border border-gray-700 text-gray-300 rounded-lg text-sm whitespace-nowrap"
        >
          {filter}
          <ChevronDown size={14} />
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
