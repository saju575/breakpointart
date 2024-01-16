import RecipeList from "@/components/layout/recipeList/recipeList.layout.component";
import SearchBar from "@/components/layout/searchBar/searchBar.layout.component";
import Link from "next/link";
import { Suspense } from "react";
import { FaPlus } from "react-icons/fa";

export default function Home({ searchParams }) {
  const search = searchParams?.search || "";
  return (
    <main className="flex w-full min-h-screen flex-col items-center gap-10 sm:p-24 p-3">
      <h1 className="text-4xl font-bold text-center">Recipe app</h1>

      <div className="container mx-auto">
        <div className="flex md:flex-row flex-col gap-3 md:justify-between md:items-center mb-3">
          {/* search input */}
          <SearchBar />
          <Link
            href={`/create-recipe`}
            className="flex items-center justify-center gap-1 px-4 py-2 bg-slate-200 rounded"
          >
            <FaPlus /> Create
          </Link>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <RecipeList search={search} />
        </Suspense>
      </div>
    </main>
  );
}
