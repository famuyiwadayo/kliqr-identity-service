import { createUserDto } from "../interfaces/dtos/user.dto";
import UserRepository from "../repositories/user.repo";

export default class UserService {
  repo = new UserRepository();

  async createUser(input: createUserDto) {
    return await this.repo.createUser(input);
  }

  async batchCreateUser(data: createUserDto[]) {
    return await this.repo.batchCreateUser(data);
  }
}
