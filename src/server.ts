import express from "express";
import commentRouter from "./routes/CommentRoute";
import UserRouter from "./routes/UserRoutes"; // Auth route removido pois n implementado
import PostRouter from "./routes/PostRoute";

const port = 3000;

const app = express();
app.use(express.json());

app.use(UserRouter);
app.use(commentRouter)
app.use(PostRouter)

app.listen(port, function () {
  console.log("Servidor rodando na porta " + port);
});
