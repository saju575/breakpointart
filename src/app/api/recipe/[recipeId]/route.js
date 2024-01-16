import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma.config";

/**
 * Retrieves a recipe by its ID from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters object containing the recipeId.
 * @param {string} req.params.recipeId - The ID of the recipe to retrieve.
 * @returns {Promise<NextResponse>} A Promise that resolves to a NextResponse object.
 */
export const GET = async (req, { params }) => {
  const { recipeId } = params;
  try {
    const data = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    return new NextResponse(JSON.stringify(data, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          message: "Something went wrong",
        },
        {
          status: 500,
        }
      )
    );
  }
};

/**
 * Updates a recipe with the specified ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.recipeId - The ID of the recipe to be updated.
 * @return {Object} - The updated recipe object.
 */
export const PUT = async (req, { params }) => {
  const { recipeId } = params;

  try {
    // Ensure the recipe with the specified ID exists
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });
    if (!existingRecipe) {
      return new NextResponse(
        JSON.stringify(
          {
            message: "Recipe not found",
          },
          {
            status: 404,
          }
        )
      );
    }

    // Update the recipe
    const body = await req.json();
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        ...body,
      },
    });

    return new NextResponse(JSON.stringify(updatedRecipe, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          message: "Something went wrong",
        },
        {
          status: 500,
        }
      )
    );
  }
};

/**
 * Deletes a recipe with the specified ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.recipeId - The ID of the recipe to delete.
 * @return {Promise<NextResponse>} Returns a promise that resolves to a NextResponse object.
 */
export const DELETE = async (req, { params }) => {
  const { recipeId } = params;

  try {
    // Ensure the recipe with the specified ID exists
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });
    if (!existingRecipe) {
      return new NextResponse(
        JSON.stringify(
          {
            message: "Recipe not found",
          },
          {
            status: 404,
          }
        )
      );
    }

    // Delete the recipe
    await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    return new NextResponse(
      JSON.stringify(
        {
          message: "Recipe deleted successfully",
        },
        {
          status: 200,
        }
      )
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          message: "Something went wrong",
        },
        {
          status: 500,
        }
      )
    );
  }
};
