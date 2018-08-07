import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ImageDataUploadComponent } from './image-data-upload.component';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  imports: [
    ThemeModule,
    NgxSpinnerModule,
  ],
  declarations: [
    ImageDataUploadComponent,
  ],
})
export class ImageDataUploadModule { }
