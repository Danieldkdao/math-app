"use client";

import { useThreads } from "@/hooks/useThreads";
import type { ThreadCategories } from "@/lib/types";
import { threadCategories } from "@/lib/utils";
import { FaSearch } from "react-icons/fa";

const ThreadSearch = () => {
  const { searchQuery, setSearchQuery, categoryFilters, setCategoryFilters } =
    useThreads();

  const applyCategoryFilters = (category: ThreadCategories) => {
    if (categoryFilters.includes(category)) {
      setCategoryFilters((prev) => prev.filter((item) => item !== category));
    } else {
      setCategoryFilters((prev) => [...prev, category]);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
          <FaSearch className="text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="Search threads or authors"
            className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {threadCategories.map((filter) => {
            const isSelected = categoryFilters.includes(filter);
            return (
              <span
                key={filter}
                onClick={() => applyCategoryFilters(filter)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold  shadow-sm cursor-pointer hover:opacity-80 ${
                  isSelected
                    ? "bg-cyan-100 border-cyan-300 text-cyan-700"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                {filter}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThreadSearch;
