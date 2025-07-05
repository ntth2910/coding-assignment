import { Injectable } from "@nestjs/common";
import { User } from "@acme/shared-models";

@Injectable()
export class UsersService {
  /*
   * In-memory storage so data is lost on server restart.
   */
  private storedUsers: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Chris" },
    { id: 4, name: "Daisy" },
    { id: 5, name: "Ed" },
  ];

  async users(): Promise<User[]> {
    return this.storedUsers;
  }

  async user(id: number): Promise<User | null> {
    return this.storedUsers.find((user) => user.id === +id) ?? null;
  }

  async newUser(payload: { name: string }): Promise<User> {
    const maxId = Math.max(0, ...this.storedUsers.map((u) => u.id));
    const newUser: User = {
      id: maxId + 1,
      name: payload.name,
    };

    this.storedUsers.push(newUser);

    return newUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const index = this.storedUsers.findIndex((user) => user.id === +id);
    if (index !== -1) {
      this.storedUsers.splice(index, 1);
      return true;
    }
    return false;
  }
}
