import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User, UsersService } from '../../services/users.service';
import { TuiButton } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [TuiButton, AsyncPipe],
  template: `
    <button tuiButton (click)="getUsers()">Запросить данные</button>
    @if (users$ | async; as users) {
    <table class="tui-space_top-4">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Surname</th>
        </tr>
      </thead>
      <tbody>
        @for (user of users; track user.id) {
        <tr>
          <td>
            {{ user.id }}
          </td>
          <td>
            {{ user.name }}
          </td>
          <td>
            {{ user.surname }}
          </td>
        </tr>
        }
      </tbody>
    </table>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  private readonly usersService = inject(UsersService);

  protected users$: Observable<User[]> = of([]);

  protected readonly columns: (keyof User)[] = ['id', 'name', 'surname'];

  protected getUsers(): void {
    this.users$ = this.usersService.getUsers();
  }
}
