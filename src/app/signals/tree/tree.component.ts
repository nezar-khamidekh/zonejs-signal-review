import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TreeItemComponent } from './components/tree-item/tree-item.component';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [TreeItemComponent],
  template: `
    <div class="tree">
      <app-tree-item [depth]="0" [maxDepth]="500" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {}
