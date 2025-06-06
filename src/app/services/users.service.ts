import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  surname: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users: User[] = [];

  public readonly users$ = new BehaviorSubject<User[]>([]);

  constructor() {
    this.generateUsers();
  }

  private generateUsers(): void {
    for (let i = 1; i <= 5000; i++) {
      this._users.push({
        id: i,
        name: `User  ${i}`,
        surname: `Surname ${i}`,
      });
    }

    this.users$.next(this._users);
  }

  public addNewUser(): void {
    const index = this._users.length;

    this._users.push({
      id: index,
      name: `User  ${index}`,
      surname: `Surname ${index}`,
    });

    this.users$.next(this._users);
  }

  public removeLastUser(): void {
    this._users.pop();

    this.users$.next(this._users);
  }
}
