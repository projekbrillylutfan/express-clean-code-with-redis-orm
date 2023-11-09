import { Request, Response } from "express";
import { CategoryRequest } from "../models/dto/category";
import { DefaultResponse } from "../models/dto/default";
import { UserRequest } from "../models/dto/user";
import Category from "../models/entity/category";
import { User } from "../models/entity/user";
import CategoriesService from "../services/categories";

class CategoriesHandler {

    async getCategories(req: Request, res: Response) {

        const categoryList: Category[] = await CategoriesService.getCategories();
    
        const response: DefaultResponse = {
          status: "ok",
          message: "sukses menampilkan data categories",
          data: {
            categoryList: categoryList,
          },
        };
    
        res.status(200).send(response);
      }

  async createCategory(req: Request, res: Response) {
    const payload: CategoryRequest = req.body;

    if (!payload.name) {
      const response: DefaultResponse = {
        status: "Bad Request",
        message: "Nama tidak boleh kosong",
        data: {
          created_cateory: null,
        },
      };

      res.status(400).send(response);
    } else {
      // TODO: call servicr to create user
      const createdCategory: Category = await CategoriesService.createCategory(
        payload
      );

      const response: DefaultResponse = {
        status: "Data Ditambahkan",
        message: "User berhasil ditambahkan",
        data: {
          created_category: createdCategory,
        },
      };

      res.status(201).send(response);
    }
  }
}

export default CategoriesHandler;
