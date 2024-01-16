"use client";

import { HOST_URL } from "@/secret";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

const RemoveRecipe = ({ id }) => {
  const router = useRouter();
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
