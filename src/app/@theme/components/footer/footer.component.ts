import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created by <b><a href="http://www.rafael.co.il/" target="_blank">Rafael</a></b> 2018</span>
  `,
})
export class FooterComponent {
}
