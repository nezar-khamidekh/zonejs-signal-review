import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { User, UsersService } from '../../services/users.service';
import { TuiButton } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-table',
  imports: [TuiButton],
  template: `
    <button tuiButton (click)="getUsers()">Запросить данные</button>
    @if (users(); as users) {
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
  private readonly destroyRef = inject(DestroyRef);

  protected users = signal<User[]>([]);

  protected readonly columns: (keyof User)[] = ['id', 'name', 'surname'];

  protected getUsers(): void {
    this.usersService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users) => this.users.set(users));
  }
}
