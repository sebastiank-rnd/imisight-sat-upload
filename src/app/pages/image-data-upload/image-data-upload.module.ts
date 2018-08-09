import { NgModule } from '@angular/core';

import { NbAlertModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ImageDataUploadComponent } from './image-data-upload.component';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  imports: [
    ThemeModule,
    NbAlertModule,
    NgxSpinnerModule,
  ],
  declarations: [
    ImageDataUploadComponent,
  ],
})
export class ImageDataUploadModule { }
