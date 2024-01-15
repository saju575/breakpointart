import Link from "next/link";
import { FaTrash } from "react-icons/fa";
const Recipe = ({ recipe }) => {
  return (
    <div className="flex justify-between items-center bg-slate-200 p-3 rounded">
      <Link href={`/recipe/${recipe.id}`}>{recipe.title}</Link>

      <FaTrash />
    </div>
  );
};

export default Recipe;
