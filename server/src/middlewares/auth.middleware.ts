import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    // If token is not provided, throw an error
    if (!token) {
      throw new ApiError(401, "Token is required");
    }

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

    // If token is invalid, throw an error
    if (!decodedToken?._id) {
      throw new ApiError(401, "Invalid token");
    }

    // Find the user by ID and exclude the password field
    const user = await User.findById(decodedToken._id).select("-password");

    // If user is not found, throw an error
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(new ApiError(401, "Unauthorized"));
  }
};

export default verifyJWT;
