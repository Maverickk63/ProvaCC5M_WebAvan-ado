import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class PostService {
    // Função para criar um novo post
    async createPost(title: string, content: string, authorId: number) {
        try{
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId,
        },
      });
      return post;
    }catch (error) {
        console.error(error);
        return null;
      }
    }
  
    // Função para listar todos os posts
    async listPosts() {
        try{
      const posts = await prisma.post.findMany({
        include: {
          author: true,
          comments: true,
        },
      });
      return posts;
        }catch (error) {
        console.error(error);
        return null;
      }
    }
  
    // Função para atualizar um post
    async updatePost(id: number, title: string, content: string) {
        try{
      const post = await prisma.post.update({
        where: { id },
        data: {
          title,
          content,
        },
      });
      return post;
        }catch (error) {
            console.error(error);
            return null;
          }
    }
  
    // Função para deletar um post
    async deletePost(id: number) {
        try{
      const post = await prisma.post.delete({
        where: { id },
      });
      return post;
    }catch (error) {
        console.error(error);
        return null;
      }
  }
}
  
  export default new PostService;