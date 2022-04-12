import express from "express";
import sessionRouter from "./routes/sessions.route";
import usersRouter from "./routes/users.routes";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/login", sessionRouter);

app.listen(3003, () => {
  console.log("Server Started!");
});
