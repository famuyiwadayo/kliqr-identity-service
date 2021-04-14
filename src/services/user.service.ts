import { createUserDto } from "../interfaces/dtos/user.dto";
import UserRepository from "../repositories/user.repo";
import { getCsvData, createError } from "../utils";

export default class UserService {
  repo = new UserRepository();

  async createUser(input: createUserDto) {
    return await this.repo.createUser(input);
  }

  async batchCreateUser(data: createUserDto[]) {
    return await this.repo.batchCreateUser(data);
  }

  async batchCreateUsersFromCsv(file: Express.Multer.File) {
    const data = await getCsvData(file);
    return await this.repo.batchCreateUser(data);
  }

  async getUsers() {
    return await this.repo.getUsers();
  }

  async getUserById(id: string) {
    const result = await this.repo.getUserById(id);
    if (!result) throw createError("User not found", 404);
    return result;
  }
}
