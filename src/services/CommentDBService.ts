import { Prisma, PrismaClient } from "@prisma/client";

// Password removido pq ainda n implementado 

const prisma = new PrismaClient();

class CommentDBService {
    constructor() {}

    async getAllComments() {
        try {
          const comments = await prisma.comment.findMany({
            include: {
              post: true,
              author: true,
            },
          });
          return comments;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

    async insertDBComment(content: string, postid: number, authorid: number) {
        try {
            const newuser = await prisma.comment.create({
              data: {
                content : content,
                postId : postid,
                authorId: authorid
              }
            });
            return newuser;
          } catch (error) {
            console.log(error);
            return null;
          }
    }

    async updateCommentContent(id: number, newContent: string) {
      try {
        const updatedComment = await prisma.comment.update({
          where: { id: id },
          data: { content: newContent },
        });
        return updatedComment;
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    async deleteDBComment(id: number) {
        try {
          await prisma.comment.delete({
            where: {
              id: id, // Deleta
            },
          });
          return true;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
}

export default new CommentDBService