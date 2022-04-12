import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUser.service";
import profileUserService from "../services/users/profileUser.service";
import updateUsersService from "../services/users/updateUser.service";

export default class UserController {
  async store(request, response) {
    const { name, email, password, isAdm } = request.body;

    const user = await createUserService({ name, email, password, isAdm });

    return response.status(201).json(user);
  }

  index(request, response) {
    const user = request.user;

    if (!user.isAdm) {
      return response
        .status(403)
        .json({ status: "Error", message: "Nao permitido!" });
    }

    const userList = listUsersService();

    return response.json(userList);
  }

  show(request, response) {
    const user = profileUserService({ user_id: request.user.id });

    return response.json(user);
  }

  update(request, response) {
    const { id } = request.params;
    const { name, email, password } = request.body;
    const user = request.user;

    if (user.id !== id && !user.isAdm) {
      return response
        .status(403)
        .json({ status: "Error", message: "Nao permitido!" });
    }
    try {
      const user = updateUsersService({
        id,
        name,
        email,
        password,
      });

      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json({
        status: "Error",
        message: err.message,
      });
    }
  }

  delete(request, response) {
    const { id } = request.params;
    const user = request.user;

    if (user.id !== id && !user.isAdm) {
      return response
        .status(403)
        .json({ status: "Error", message: "Nao permitido!" });
    }
    try {
      deleteUserService({ id });

      return response.status(204).json({
        status: "sussess",
        message: "User deleted with success",
      });
    } catch (err) {
      return response.status(400).json({
        status: "Error",
        message: err.message,
      });
    }
  }
}
