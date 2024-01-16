import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma.config";

/**
 * Create a Recipe
 */
export const POST = async (req) => {
  try {
    const body = await req.json();

    const recipe = await prisma.recipe.create({
      data: { ...body },
    });

    return new NextResponse(JSON.stringify(recipe, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          message: error,
        },
        {
          status: 500,
        }
      )
    );
  }
};

/**
 * Get all Recipe
 */

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const searchString = searchParams.get("search") || "";
  console.log(searchString);

  // const query = {
  //   where: {
  //     ...(searchString &&
  //       OR: [
  //         {
  //           title: {
  //             contains: searchString,
  //           },
  //         },
  //         {
  //           ingredients: {
  //             some: {
  //               contains: searchString,
  //             },
  //           },
  //         },
  //       ],
  //     ),
  //   },
  // };

  try {
    const data = await prisma.recipe.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            ingredients: {
              has: searchString,
            },
          },
        ],
      },
    });

    return new NextResponse(
      JSON.stringify(
        { data },
        {
          status: 200,
        }
      )
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          message: error,
        },
        {
          status: 500,
        }
      )
    );
  }
};
