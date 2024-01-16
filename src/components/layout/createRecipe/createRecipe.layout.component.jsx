"use client";
import { HOST_URL } from "@/secret";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Select from "react-select";
import * as Yup from "yup";
import ingredientList from "../../../../ingredients.json";

/* modified ingredient list */
const options = ingredientList.map((ingredient) => ({
  value: ingredient.label,
  label: ingredient.label,
}));

// Define the validation schema using Yup

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  ingredients: Yup.array()
    .of(Yup.object())
    .required("Ingredients are required"),
  instruction: Yup.string().required("Instructions are required"),
  image: Yup.string().url("Invalid URL"),
  video: Yup.string().url("Invalid URL"),
});

// create recipe request function
const CreateRecipe = async (data) => {
  try {
    // post request
    const response = await fetch(`${HOST_URL}/api/recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    return resData;
  } catch (error) {
    throw error;
  }
};

/**
 * Renders a form to create a recipe.
 *
 * @return {JSX.Element} The form component.
 */

const CreateRecipeForm = () => {
  const router = useRouter();
  // formik hook

  const formik = useFormik({
    initialValues: {
      title: "",
      ingredients: [],
      instruction: "",
      image: "",
      video: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const ingredients = values.ingredients.map((ingredient) => {
          return ingredient.value;
        });
        // console.log({ ...values, ingredients });

        // take the existing value
        const recipe = {};
        for (let key in values) {
          if (values[key]) {
            if (key === "ingredients") {
              recipe[key] = ingredients;
            } else {
              recipe[key] = values[key];
            }
          }
        }

        await CreateRecipe(recipe);
        formik.resetForm();

        router.push("/", { replace: true });
      } catch (error) {}
      // handle form submission
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="md:w-[800px] mx-auto bg-[#EDF2F7]">
        <Link href={`/`} className="flex items-center gap-1 mt-2">
          <FaArrowLeft /> Home
        </Link>
        <h1 className="text-3xl font-bold text-center p-6">Create Recipe</h1>
        <form onSubmit={formik.handleSubmit} className="p-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="ingredients"
            >
              Ingredients
            </label>

            <Select
              id="ingredients"
              name="ingredients"
              isMulti
              isSearchable
              options={options}
              value={formik.values.ingredients}
              onChange={(selectedOptions) => {
                // console.log(selectedOptions);
                formik.setFieldValue("ingredients", selectedOptions);
              }}
            />
            {formik.touched.ingredients && formik.errors.ingredients && (
              <div>{formik.errors.ingredients}</div>
            )}
          </div>

          {/* instructions textarea */}

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="instruction"
            >
              Instruction
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="instruction"
              rows="10"
              cols="40"
              placeholder="Enter instruction"
              value={formik.values.instruction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.instruction && formik.errors.instruction && (
              <div className="text-red-500">{formik.errors.instruction}</div>
            )}
          </div>

          {/* image url */}

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Image URL
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="text"
              placeholder="Enter image URL"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500">{formik.errors.image}</div>
            )}
          </div>

          {/* video url */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="video"
            >
              Video URL
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="video"
              type="text"
              placeholder="Enter video URL"
              value={formik.values.video}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.video && formik.errors.video && (
              <div className="text-red-500">{formik.errors.video}</div>
            )}
          </div>

          {/* submit button */}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
      ;
    </div>
  );
};

export default CreateRecipeForm;
