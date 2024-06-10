import { Request, Response } from "express";
import PostDBService from "../services/PostDBService";

class postController {
    constructor() {}

    async listPosts(req: Request, res: Response){
        try {
            const users = await PostDBService.listPosts();
            res.json({
              status: "ok",
              posts: users,
            });
          } catch (error) {
            console.log(error);
            res.json({
              status: "error",
              message: error,
            });
          }
    }

    async createPosts(req: Request, res: Response){
        const { title, content, authorId } = req.body;
        try{
        const post = await PostDBService.createPost(title,content,authorId)
        res.json({
            status: "ok",
            users: post,
          });
        } catch (error) {
          console.log(error);
          res.json({
            status: "error",
            message: error,
          });
        }
    
        
  }
    async updatePosts(req: Request, res: Response){
        const id = parseInt(req.params.id)
        const { title, content } = req.body;
        try{
            const post = await PostDBService.updatePost(id , title, content)
            res.json({
                status: "ok",
                users: post,
              });
            } catch (error) {
              console.log(error);
              res.json({
                status: "error",
                message: error,
              });
            }
    }
    async deletePosts(req: Request, res: Response){
        const id = parseInt(req.params.id)
        try{
            const post = await PostDBService.deletePost(id)
            res.json({
                status: "ok",
                users: post,
              });
        }catch (error) {
            console.log(error);
            res.json({
              status: "error",
              message: error,
            });
          }
    }
}

export default new postController()