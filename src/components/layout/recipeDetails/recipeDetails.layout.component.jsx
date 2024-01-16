import { HOST_URL } from "@/secret";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

// get recipe details request
const getRecipeDetails = async (id) => {
  const response = await fetch(`${HOST_URL}/api/recipe/${id}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
};

// get recipe details
const RecipeDetails = async ({ id }) => {
  const recipe = await getRecipeDetails(id);
  return (
    <div className="mt-5 px-3 py-4">
      <Link href={`/`} className="flex items-center gap-1">
        <FaArrowLeft /> Home
      </Link>
      <div className="flex md:flex-row flex-col justify-center items-center md:items-start gap-6 mt-5">
        <div className="w-full md:w-2/3 bg-slate-100 h-[360px] md:h-[500px] flex justify-center items-center relative">
          {/* video show */}
          {recipe?.video && (
            <iframe className="w-full h-full" src={recipe.video}></iframe>
          )}
          {!recipe?.video && recipe?.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover h-[500px]"
            />
          )}

          {!recipe?.video && !recipe?.image && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png?20210219185637"
              alt={recipe.title}
              className="w-full object-cover h-96"
            />
          )}
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-4 ">
          <h2 className="text-2xl font-bold uppercase">{recipe.title}</h2>
          {recipe?.ingredients?.length > 0 && (
            <ul>
              {recipe?.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#e7e7e7] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-[#666] capitalize">
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <p>{recipe?.instruction}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
