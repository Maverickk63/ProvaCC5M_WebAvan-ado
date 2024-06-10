import { Request, Response } from "express";
import CommentDBService from "../services/CommentDBService";

class CommentController {
    constructor() {}

    async listComments(req: Request, res: Response){
        try {
            const comment = await CommentDBService.getAllComments();
            res.json({
                status: "ok",
                comments: comment,
              });
            } catch (error) {
              console.log(error);
              res.json({
                status: "error",
                message: error,
              });
            }
    }

    async createComment(req: Request, res: Response) {
        const body = req.body;
        console.log(body);
        const { content, postId, authorId } = req.body;
    
        try {
          const newComment = await CommentDBService.insertDBComment(
            content,postId, authorId 
          );
    
          res.json({
            status: "ok",
            newComment: newComment,
          });
        } catch (error) {
          console.log(error);
              res.json({
                status: "error",
                message: error,
              });
        }
      }

      async updateComment(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
          res.json({
            status: "error",
            message: "Faltou o ID",
          });
        }
    
        const body = req.body.content;
    
        try {
          const updatedUser = await CommentDBService.updateCommentContent(
            parseInt(id),
            body
          );
          res.json({
            status: "ok",
            newuser: updatedUser,
          });
        } catch (error) {
          res.json({
            status: "error",
            message: error,
          });
        }
      }

    async deleteComment(req: Request, res: Response) {
        const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
      }
  
      try {
        const response = await CommentDBService.deleteDBComment(parseInt(id));
        if (response) {
          res.json({
            status: "ok",
            message: "usuário deletado com sucesso",
          });
        }
      } catch (error) {
        console.log(error);
        res.json({
          status: "error",
          message: error,
        });
      }
    }
}

export default new CommentController()