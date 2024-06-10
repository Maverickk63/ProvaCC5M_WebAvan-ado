import { Request, Response } from "express";
import UserDBService from "../services/UserDBService";
import { generateHash } from "../utils/BcryptUtil";
// Password removido pq n implementado

class UserController {
    constructor() {}

    async listUsers(req: Request, res: Response) {
        try {
            const users = await UserDBService.listDBUsers();
            res.json({
              status: "ok",
              users: users,
            });
          } catch (error) {
            console.log(error);
            res.json({
              status: "error",
              message: error,
            });
          }
    }

    async createUser(req: Request, res: Response) {
        const body = req.body;
        console.log(body);
      // Removida password ainda n implementada
        if (!body.email || !body.name) {
          res.json({
            status: "error",
            message: "Falta parâmetros",
          });
          return;
        }
    
        try {
          const newuser = await UserDBService.insertDBUser({
            name: body.name,
            email: body.email
          });
          res.json({
            status: "ok",
            newuser: newuser,
          });
        } catch (error) {
          res.json({
            status: "error",
            message: error,
          });
        }
      }

    async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    const { name, email } = req.body;
    if (!email || !name) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const updatedUser = await UserDBService.updateDBUser(
        {
          name: name,
          email: email,
        },
        parseInt(id)
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
  async deleteUser(req: Request, res: Response) {
      const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
      }
  
      try {
        const response = await UserDBService.deleteDBUser(parseInt(id));
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

export default new UserController();