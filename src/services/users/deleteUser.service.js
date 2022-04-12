import users from "../../database";

const deleteUserService = ({ id }) => {
  let selectUser = users.findIndex((user) => user.id === id);

  if (selectUser >= 0) {
    users.splice(selectUser, 1);
  } else {
    throw new Error("Usuario não encontrado!");
  }
};

export default deleteUserService;
