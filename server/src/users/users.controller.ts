import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Delete,
  Body,
} from "@nestjs/common";
import { randomDelay } from "../utils/random-delay";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.users();
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    await randomDelay();
    const user = await this.usersService.user(Number(id));
    if (user) return user;
    throw new NotFoundException();
  }

  @Post()
  async createUser(@Body() body: { name: string }) {
    await randomDelay();
    return this.usersService.newUser({ name: body.name });
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    await randomDelay();
    const success = await this.usersService.deleteUser(Number(id));
    if (!success) throw new NotFoundException();
  }
}
