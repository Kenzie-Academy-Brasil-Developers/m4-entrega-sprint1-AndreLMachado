import users from "../../database";

const updateUsersService = ({ id, name, email, password, isAdm = false }) => {
  let userUpdate = users.findIndex((user) => user.id === id);

  let userCreate = users.filter((user) => user.id === id);

  if (userUpdate < 0) {
    throw new Error("Usuario nao encontrao!");
  }

  const create = userCreate[0].createOn;
  const adm = userCreate[0].isAdm;
  const now = new Date();

  const newUser = {
    name,
    email,
    password,
    isAdm: adm,
    id,
    createOn: create,
    updateOn: `Ultima atualização ${now}`,
  };

  users[userUpdate] = newUser;

  return newUser;
};

export default updateUsersService;
