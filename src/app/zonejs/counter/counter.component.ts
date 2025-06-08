import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { TuiButton, TuiTitle } from '@taiga-ui/core';

@Component({
  selector: 'app-counter',
  imports: [TuiButton, TuiTitle],
  template: `
    <h2 tuiTitle="l">Счётчик: {{ count }}</h2>
    <div class="tui-space_top-2">
      <button tuiButton (click)="increment()">Увеличить</button>
      <button class="tui-space_left-2" tuiButton (click)="asyncIncrement()">
        Увеличить асинхронно
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  protected count = 0;

  protected increment(): void {
    this.count++;
  }

  protected asyncIncrement(): void {
    setTimeout(() => {
      this.count++;
      this.cdr.markForCheck();
    });
  }
}
