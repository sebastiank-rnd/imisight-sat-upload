import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ImageDataUploadComponent } from './image-data-upload.component';



@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ImageDataUploadComponent,
  ],
})
export class ImageDataUploadModule { }
