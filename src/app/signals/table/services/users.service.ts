import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  surname: string;
}

@Injectable()
export class UsersService {
  public readonly users = signal<User[]>([]);

  public generateUsers(): void {
    const users = [];

    for (let i = 1; i <= 5000; i++) {
      users.push({
        id: i,
        name: `User  ${i}`,
        surname: `Surname ${i}`,
      });
    }

    this.users.set(users);
  }

  public addNewUser(): void {
    const index = this.users().length;

    this.users.update(users => [
      ...users,
      {
        id: index,
        name: `User  ${index}`,
        surname: `Surname ${index}`,
      },
    ]);
  }

  public removeLastUser(): void {
    this.users.update(users => users.slice(0, users.length - 1));
  }
}
