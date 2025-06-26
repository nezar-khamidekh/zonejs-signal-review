import {
  Component,
  ChangeDetectionStrategy,
  viewChild,
  ElementRef,
  AfterViewInit,
  input,
  computed,
  linkedSignal,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiAppearance, TuiButton, TuiTitle } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';
import { fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [TuiTitle, TuiButton, TuiAppearance, TuiCardMedium, TuiTitle],
  template: `
    <div
      class="tui-space_top-2"
      tuiAppearance="neutral"
      tuiCardMedium
      [style.margin-left.px]="depth() * 10"
    >
      <span tuiTitle="m">{{ itemText() }}</span>

      <button #editItemButton class="tui-space_left-2" tuiButton>Изменить</button>
    </div>

    @if (!isDeepest()) {
      <app-tree-item [depth]="depth() + 1" [maxDepth]="maxDepth()" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeItemComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly editItemButton = viewChild('editItemButton', { read: ElementRef });

  public readonly depth = input.required<number>();
  public readonly maxDepth = input.required<number>();

  protected readonly itemText = linkedSignal(() => this.depth());

  protected readonly isDeepest = computed(() => this.depth() === this.maxDepth());

  ngAfterViewInit(): void {
    fromEvent(this.editItemButton()?.nativeElement, 'click')
      .pipe(
        tap(() => this.updateItemText()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private updateItemText(): void {
    this.itemText.set(Math.round(Math.random() * this.maxDepth()));
  }
}
