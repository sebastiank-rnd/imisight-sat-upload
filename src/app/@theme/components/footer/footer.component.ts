import { Component } from '@angular/core';

import { environment } from './../../../../environments/environment';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by" title={{token}}>Created by <b><a href="http://www.rafael.co.il/" target="_blank">Rafael</a></b> 2018</span>
  `,
})
export class FooterComponent {
  token = environment.info.token;
}
