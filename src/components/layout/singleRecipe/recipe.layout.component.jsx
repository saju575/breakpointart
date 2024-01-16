import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import RemoveRecipe from "../removeBtn/removeBtn.layout.component";
const Recipe = ({ recipe }) => {
  return (
    <div className="flex justify-between items-center bg-slate-200 p-3 rounded">
      <Link href={`/recipe/${recipe.id}`}>{recipe.title}</Link>
      <div className="flex gap-2 items-center">
        <Link href={`/edit-recipe/${recipe.id}`}>
          <FaEdit />
        </Link>
        <RemoveRecipe id={recipe.id} />
      </div>
    </div>
  );
};

export default Recipe;
