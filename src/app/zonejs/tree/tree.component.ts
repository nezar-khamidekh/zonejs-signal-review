import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiTree } from '@taiga-ui/kit';
import { ListItem, TreeService } from './services/tree.service';
import { TuiHandler } from '@taiga-ui/cdk/types';
import { EMPTY_ARRAY } from '@taiga-ui/cdk';

interface TreeNode {
  readonly children?: readonly TreeNode[];
  readonly text: string;
  readonly value: ListItem;
}

@Component({
  selector: 'app-tree',
  imports: [TuiTree, TuiButton],
  template: `
    @if (treeData) {
      <tui-tree
        [childrenHandler]="childrenHandler"
        [content]="content"
        [tuiTreeController]="true"
        [value]="treeData"
      />
    }

    <ng-template #content let-node="node" let-value>
      <div class="wrapper" style="display:flex; align-items:center; gap:8px;">
        <span>{{ value.text }} ({{ value.value.value }})</span>

        @if (isDeepest(value.value.id)) {
          <button
            tuiButton
            size="xs"
            type="button"
            (click)="updateItem()"
            style="margin-left:auto;"
          >
            Изменить самый глубокий элемент
          </button>
        }
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent implements OnInit {
  private treeService = inject(TreeService);

  public treeData: TreeNode | undefined;

  ngOnInit() {
    this.treeService.data$.subscribe(data => {
      this.treeData = this.buildTree(data);
    });
  }

  private buildTree(data: ListItem[]): TreeNode {
    const buildNode = (id: number): TreeNode => {
      const item = data[id];

      return {
        text: item.name,
        value: item,
        children: item.children.length
          ? item.children.map(childId => buildNode(childId))
          : undefined,
      };
    };

    return buildNode(0);
  }

  public readonly childrenHandler: TuiHandler<TreeNode, readonly TreeNode[]> = item =>
    item.children || EMPTY_ARRAY;

  public isDeepest(id: number): boolean {
    return id === this.treeService.depth - 1;
  }

  public updateItem(): void {
    this.treeService.updateItem(this.treeService.depth - 1);
  }
}
