import { v4 as uuid } from "uuid";
import * as bcrypt from "bcryptjs";
import users from "../../database";

const createUserService = async ({ name, email, password, isAdm = false }) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  const now = new Date();

  const user = {
    name,
    email,
    password: hashedPassword,
    id: uuid(),
    isAdm,
    createOn: `Criado ${now}`,
    updateOn: `Ultima atualização ${now}`,
  };
  users.push(user);

  return user;
};

export default createUserService;
