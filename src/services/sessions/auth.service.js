import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import users from "../../database";

const authService = async ({ email, password }) => {
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error("asdsadasdadsdsEmail ou senha invalido, tente novamente");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Email ou senha invalido, tente novamente");
  }

  const token = jwt.sign({ user }, "secret", {
    expiresIn: "24h",
    subject: user.id,
  });

  return { token };
};

export default authService;
