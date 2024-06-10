import { Router } from "express";
import CommentController from "../controller/CommentController";

const commentRouter = Router()

commentRouter.get("/api/comments", CommentController.listComments)

commentRouter.post("/api/comment", CommentController.createComment)

commentRouter.delete("/api/comment/:id", CommentController.deleteComment)

commentRouter.patch("/api/comment/:id", CommentController.updateComment)

export default commentRouter