import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { TuiAppearance, TuiButton, TuiTitle } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [TuiTitle, TuiButton, TuiAppearance, TuiCardMedium, TuiTitle, AsyncPipe],
  template: `
    <div
      class="tui-space_top-2"
      tuiAppearance="neutral"
      tuiCardMedium
      [style.margin-left.px]="depth * 10"
    >
      <span tuiTitle="m">{{ itemText$ | async }}</span>

      <button class="tui-space_left-2" tuiButton (click)="updateItemText()">Изменить</button>
    </div>

    @if (!isDeepest) {
      <app-tree-item [depth]="depth + 1" [maxDepth]="maxDepth" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeItemComponent implements OnInit {
  @Input({ required: true }) depth!: number;
  @Input({ required: true }) maxDepth!: number;

  protected readonly itemText$ = new BehaviorSubject<number>(0);

  protected get isDeepest(): boolean {
    return this.depth === this.maxDepth;
  }

  ngOnInit(): void {
    this.itemText$.next(this.depth);
  }

  protected updateItemText(): void {
    this.itemText$.next(Math.round(Math.random() * this.maxDepth));
  }
}
