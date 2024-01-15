import RecipeList from "@/components/layout/recipeList/recipeList.layout.component";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="text-4xl font-bold text-center">Recipe app</h1>

      <div className="container mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <RecipeList />
        </Suspense>
      </div>
    </main>
  );
}
