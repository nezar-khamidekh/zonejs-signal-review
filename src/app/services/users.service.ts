import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  surname: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.generateUsers();
  }

  private generateUsers(): void {
    for (let i = 1; i <= 10000; i++) {
      this.users.push({
        id: i,
        name: `User  ${i}`,
        surname: `Surname ${i}`,
      });
    }
  }

  public getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
