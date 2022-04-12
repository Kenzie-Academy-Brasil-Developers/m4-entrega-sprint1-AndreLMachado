import authService from "../services/sessions/auth.service";

export default class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    try {
      const user = await authService({ email, password });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({
        status: "Error",
        message: err.message,
      });
    }
  }
}
