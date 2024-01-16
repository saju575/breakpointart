import RecipeDetails from "@/components/layout/recipeDetails/recipeDetails.layout.component";
import { Suspense } from "react";

/**  Recipe details page */
const RecipePage = ({ params }) => {
  const { slug } = params;
  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <RecipeDetails id={slug} />
      </Suspense>
    </div>
  );
};

export default RecipePage;
