import { Prisma, PrismaClient } from "@prisma/client";

// Password removido pq ainda n implementado 

const prisma = new PrismaClient();

class UserDBService {
    constructor() {}

    async listDBUsers(){
        try {
            return await prisma.user.findMany({
                select: {
                    name: true, // Chama prisma para pegar users
                    email: true
                  }
            });
        } catch (error) {
            console.log(error);
            return null;
          }
    }

    async insertDBUser(user: Prisma.UserCreateInput) {
        try {
            const newuser = await prisma.user.create({
              data: user, // Chama prisma para criar user
            });
            return newuser;
          } catch (error) {
            console.log(error);
            return null;
          }
    }

    async updateDBUser(user: Prisma.UserUpdateInput, id: number) {
        try {
            const updatedUser = await prisma.user.update({
              data: user,
              where: {
                id: id, // Altera o usuario
              },
            });
            return updatedUser;
          } catch (error) {
            console.log(error);
            return null;
          } 
    }

    async deleteDBUser(id: number) {
        try {
          await prisma.user.delete({
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

export default new UserDBService