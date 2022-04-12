import jwt from "jsonwebtoken";

const verifyAuthMiddleware = (request, response, next) => {
  let token = request.headers.authorization;

  token = token.split(" ")[1];

  if (!token) {
    return response.status(401).json({
      status: "Error",
      message: "Missing Authorization",
    });
  }

  jwt.verify(token, "secret", (error, decoded) => {
    if (error) {
      return response.status(401).json({
        status: "Error",
        message: "Invalid Token",
      });
    }

    const { sub } = decoded;

    request.user = {
      id: sub,
      isAdm: decoded.user.isAdm || false,
    };

    next();
  });
};

export default verifyAuthMiddleware;
