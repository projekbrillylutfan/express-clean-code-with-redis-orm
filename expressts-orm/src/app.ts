import express, { Application, NextFunction } from "express";
import UserHandler from "./handlers/users";
import PostHandler from "./handlers/posts";
import CategoriesHandler from "./handlers/categories";

const app: Application = express();
const PORT: number = 8080;

app.use(express.json());

const userHandler = new UserHandler();
const postsHandler = new PostHandler();
const categoriesHandler = new CategoriesHandler();



app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUserById);
app.post("/api/users", userHandler.creatUser);
app.delete("/api/users/:id", userHandler.deleteUserById);

// create category router for redis
app.post("/api/categories", categoriesHandler.createCategory)
app.get("/api/categories", categoriesHandler.getCategories)


app.get("/api/posts", postsHandler.getPosts);
app.get("/api/posts/:id", postsHandler.getPostsById);
app.post("/api/posts", postsHandler.createPost);
app.patch("/api/posts/:id", postsHandler.updatePostById);
app.delete("/api/posts/:id", postsHandler.deletePostById);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});