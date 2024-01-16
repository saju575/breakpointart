import Recipe from "../singleRecipe/recipe.layout.component";

const getRecipeList = async (search = "") => {
  const response = await fetch(
    `http://localhost:3000/api/recipe?search=${search}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
};

const RecipeList = async ({ search }) => {
  const recipes = await getRecipeList(search);
  if (recipes?.data?.length === 0) return <div>No recipes found</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {recipes?.data?.map((recipe) => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
