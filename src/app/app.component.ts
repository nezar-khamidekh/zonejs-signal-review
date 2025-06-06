import { TuiLink, TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, RouterOutlet, RouterLink, TuiLink],
  template: `
    <tui-root>
      <div class="page-container">
        <div class="navigation">
          <a tuiLink routerLink="">Главная</a>
          <a tuiLink routerLink="/zonejs/counter">Counter [Zone.js]</a>
          <a tuiLink routerLink="/signals/counter">Counter [Signal API]</a>
          <a tuiLink routerLink="/zonejs/table">Table [Zone.js]</a>
          <a tuiLink routerLink="/signals/table">Table [Signal API]</a>
          <a tuiLink routerLink="/zonejs/tree">Tree [Zone.js]</a>
          <a tuiLink routerLink="/signals/tree">Tree [Signal API]</a>
        </div>
        <div class="page-container">
          <router-outlet />
        </div>
      </div>
    </tui-root>
  `,
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'zonejs-signal-review';
}
