import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma.config";

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
