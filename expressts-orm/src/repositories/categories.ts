import poolPG from "../../config/postgresql";
import poolRedis from "../../config/redis";
import Category from "../models/entity/category";
import { User } from "../models/entity/user";

class CategoriesRepository {
  static async getCategories(): Promise<Category[]> {
    const getCategories = await poolPG.query("SELECT id, name FROM categories");

    const response: Category[] = getCategories.rows;

    return response;
  }
  static async createcategory(category: Category): Promise<Category> {
    const createCategory = await poolPG.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [category.name]
    );

    const createdCategory: Category = {
      id: createCategory.rows[0].id,
      name: createCategory.rows[0].name,
    };

    return createdCategory;
  }

  static async setCategoriesCache(categories: Category[]): Promise<void> {
    const redisPool = await poolRedis.createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();


    await redisPool.SET("categories", JSON.stringify(categories));
  }

  static async getCategoriesCache(): Promise<Category[]> {
    const redisPool = await poolRedis.createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    const categoryListString = await redisPool.GET("categories");
    let categoryList: Category[] = [];

    if (categoryListString) {
      categoryList = JSON.parse(categoryListString);
    }

    return categoryList;
  }
}

export default CategoriesRepository;
