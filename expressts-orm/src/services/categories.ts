import { CategoryRequest } from "../models/dto/category";
import { UserRequest } from "../models/dto/user";
import Category from "../models/entity/category";
import { User } from "../models/entity/user";
import CategoriesRepository from "../repositories/categories";

class CategoriesService {
  static async getCategories(): Promise<Category[]> {

    let listCategory: Category[] = [];
    // TODO: GET LIST CATEGORIES REDIS, if empty => get from postgres
    listCategory = await CategoriesRepository.getCategoriesCache();

    if (listCategory.length === 0) {
        listCategory = await CategoriesRepository.getCategories();
    }

    return listCategory;
  }
  static async createCategory(category: CategoryRequest): Promise<Category> {
    // TODO: call rep to create user

    const categoryToCreate: Category = {
      name: category.name,
    };
    const createdCategory = await CategoriesRepository.createcategory(
      categoryToCreate
    );

    // TODO: UPDATE TO REDIS LIST CATEGORIES

    const listCategory = await CategoriesRepository.getCategories();

    await CategoriesRepository.setCategoriesCache(listCategory);

    return createdCategory;
  }
}

export default CategoriesService;
