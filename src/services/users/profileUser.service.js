import users from "../../database";

const profileUserService = ({ user_id }) => {
  return users.find((user) => user.id === user_id);
};

export default profileUserService;
