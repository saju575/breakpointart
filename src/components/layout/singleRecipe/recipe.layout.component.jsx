import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
const Recipe = ({ recipe }) => {
  return (
    <div className="flex justify-between items-center bg-slate-200 p-3 rounded">
      <Link href={`/recipe/${recipe.id}`}>{recipe.title}</Link>
      <div className="flex gap-2">
        <Link href={`/edit-recipe/${recipe.id}`}>
          <FaEdit />
        </Link>
        <FaTrash />
      </div>
    </div>
  );
};

export default Recipe;
