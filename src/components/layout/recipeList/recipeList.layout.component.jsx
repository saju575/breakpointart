import Recipe from "../singleRecipe/recipe.layout.component";

const getRecipeList = async () => {
  const response = await fetch("http://localhost:3000/api/recipe", {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
};

const RecipeList = async () => {
  const recipes = await getRecipeList();
  return (
    <div className="grid grid-cols-2 gap-4">
      {recipes?.data.map((recipe) => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
