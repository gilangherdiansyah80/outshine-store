import { useResponsiveNavigation } from "@outshine/hooks/use-responsive-navigation";

const FilterBar = () => {
  const { push } = useResponsiveNavigation();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        {/* Main Filter Button */}
        <button
          onClick={() => push("/filter")}
          className="flex items-center gap-2 px-4 py-2 h-11 bg-[#0F172A] cursor-pointer text-white rounded-lg text-sm font-medium whitespace-nowrap active:scale-95 transition-transform shadow-sm"
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
      </div>
    </div>
  );
};

export default FilterBar;
