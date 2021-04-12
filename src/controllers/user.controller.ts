import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { sendError, sendResponse } from "../utils";

const service = new UserService();
export default class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getUsers();
      sendResponse(res, 200, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getUserById(req.params.id);
      sendResponse(res, 200, result ?? {});
    } catch (error) {
      sendError(error, next);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.createUser(req.body);
      sendResponse(res, 201, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async batchCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!Array.isArray(req.body.input))
        throw new Error("Input must be an array");
      const result = await service.batchCreateUser(req.body.input);
      sendResponse(res, 201, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async batchCreateUsersFromCsv(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await service.batchCreateUsersFromCsv(req.file);
      sendResponse(res, 201, result);
    } catch (error) {
      sendError(error, next);
    }
  }
}
