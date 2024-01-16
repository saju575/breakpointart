import RecipeList from "@/components/layout/recipeList/recipeList.layout.component";
import Link from "next/link";
import { Suspense } from "react";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="text-4xl font-bold text-center">Recipe app</h1>

      <div className="container mx-auto">
        <div className="flex justify-end mb-3">
          <Link
            href={`/create-recipe`}
            className="flex items-center justify-center gap-1 px-4 py-2 bg-slate-200 rounded"
          >
            <FaPlus /> Create
          </Link>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <RecipeList />
        </Suspense>
      </div>
    </main>
  );
}
