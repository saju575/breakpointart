"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * A search bar component that allows users to search for recipes or ingredients.
 * @returns {JSX.Element} The search bar component.
 */
const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Handles the search form submission.
   * @param {Event} e - The form submission event.
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`?search=${searchTerm.trim()}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="relative flex flex-wrap items-stretch">
          <input
            type="text"
            className="w-[220px] relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-[#333] outline-none transition duration-200 ease-in-out  focus:outline-none "
            placeholder="Recipe/Ingredient name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button
            type="submit"
            className="z-[2] inline-block rounded-r bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white bg-blue-500 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
