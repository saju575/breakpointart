import EditRecipe from "@/components/layout/editRecipe/editRecipe.layout.component";

const getRecipe = async (id) => {
  const response = await fetch(`http://localhost:3000/api/recipe/${id}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
};

const page = async ({ params }) => {
  const { slug } = params;
  const recipe = await getRecipe(slug);
  return (
    <div className="container mx-auto py-7">
      <EditRecipe recipe={recipe} />
    </div>
  );
};

export default page;
