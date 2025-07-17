import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, tap } from 'rxjs';
import { User, UsersService } from './services/users.service';

@Component({
  selector: 'app-table',
  imports: [TuiButton],
  template: `
    <button #getUsersButton class="tui-space_right-2" tuiButton>Запросить данные</button>
    <button #addNewUserButton class="tui-space_right-2" tuiButton>Добавить</button>
    <button #removeLastUserButton tuiButton>Удалить</button>
    @if (users.length) {
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
  providers: [UsersService],
})
export class TableComponent implements AfterViewInit {
  private readonly usersService = inject(UsersService);
  private readonly destroyRef = inject(DestroyRef);

  private getUsersButton = viewChild('getUsersButton', { read: ElementRef });
  private addNewUserButton = viewChild('addNewUserButton', { read: ElementRef });
  private removeLastUserButton = viewChild('removeLastUserButton', { read: ElementRef });

  public get users(): User[] {
    return this.usersService.users();
  }

  ngAfterViewInit(): void {
    fromEvent(this.getUsersButton()?.nativeElement, 'click')
      .pipe(
        tap(() => this.usersService.generateUsers()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    fromEvent(this.addNewUserButton()?.nativeElement, 'click')
      .pipe(
        tap(() => this.addNewUser()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    fromEvent(this.removeLastUserButton()?.nativeElement, 'click')
      .pipe(
        tap(() => this.removeLastUser()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private addNewUser(): void {
    this.usersService.addNewUser();
  }

  private removeLastUser(): void {
    this.usersService.removeLastUser();
  }
}
