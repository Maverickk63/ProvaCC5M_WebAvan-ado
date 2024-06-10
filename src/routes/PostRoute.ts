import { Router } from "express";
import PostController from "../controller/PostController";

const PostRouter = Router()

PostRouter.get("/api/posts", PostController.listPosts)

PostRouter.post("/api/post", PostController.createPosts)

PostRouter.delete("/api/post/:id", PostController.deletePosts)

PostRouter.patch("/api/post/:id", PostController.updatePosts)

export default PostRouter