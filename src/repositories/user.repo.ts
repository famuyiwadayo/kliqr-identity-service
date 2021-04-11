import { createUserDto } from "../interfaces/dtos/user.dto";
import { UserRo } from "../interfaces/ros/user.ro";
import {
  createUserSql,
  getUserByIdSql,
  getUsersSql,
} from "../db/queries/user.query";
import { query } from "../db/db";

export default class UserRepository {
  async createUser(input: createUserDto): Promise<UserRo> {
    try {
      const values = [
        input.first_name,
        input.last_name,
        input.avatar,
        input.created_at,
        input.updated_at,
      ];
      if (input.id) values.unshift(input.id);
      const result = await query(createUserSql(!!!input.id), values);
      return result.rows[0];
    } catch (error) {
      console.log(error.routine);
      if (error.routine === "_bt_check_unique")
        throw new Error("User already exist");
      throw new Error(error);
    }
  }

  async batchCreateUser(data: createUserDto[]): Promise<UserRo[]> {
    const toRunInParallel: any[] = [];
    data.forEach((input) => toRunInParallel.push(this.createUser(input)));
    const result = (await Promise.all(toRunInParallel)) as UserRo[];
    return result;
  }

  async getUsers(): Promise<UserRo[]> {
    const result = await query(getUsersSql);
    return result.rows;
  }

  async getUserById(id: string): Promise<UserRo> {
    const result = await query(getUserByIdSql, [id]);
    return result.rows[0];
  }
}
