"use client";

import { HOST_URL } from "@/secret";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

// This component renders a button that, when clicked, removes a recipe with a given id from the API

/**
 * RemoveRecipe component
 * @param {object} props - The props object
 * @param {string} props.id - The id of the recipe to remove
 * @returns {JSX.Element} - The RemoveRecipe component
 */
const RemoveRecipe = ({ id }) => {
  const router = useRouter();

  /**
   * Handles the remove action
   * @param {string} id - The id of the recipe to remove
   * @returns {Promise<void>} - A promise that resolves when the remove action is complete
   */
  const remove = async (id) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`${HOST_URL}/api/recipe/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={() => remove(id)} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveRecipe;
