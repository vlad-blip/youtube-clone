"use server";

import { getDataSource } from "@/utils/typeorm/client";
import { Category } from "@/utils/typeorm/entity/category.entity";

export async function getCategories() {
  try {
    const dataSource = await getDataSource();
    const categoriesRepository = await dataSource.getRepository(Category);
    const categories = await categoriesRepository.find({
      order: { title: "ASC" },
    });

    const categoriesOptions = categories.map((category) => ({
      label: category.title,
      value: String(category.id),
    }));

    return categoriesOptions;
  } catch (error) {
    console.error("[getCategories]", error);
  }
}
