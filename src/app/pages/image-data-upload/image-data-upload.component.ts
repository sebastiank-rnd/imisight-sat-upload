import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ImageDataUploadService } from './image-data-upload.service';

@Component({
  selector: 'ngx-image-data-upload',
  templateUrl: './image-data-upload.component.html',
  styleUrls: ['./image-data-upload.component.scss']
})
export class ImageDataUploadComponent implements OnInit {
  dataForm: FormGroup;
  geoFile: any;
  isUploading = false;

  constructor(formBuilder: FormBuilder, private uploadService: ImageDataUploadService) {
    this.dataForm = formBuilder.group({
      geoFile: '',
      fileName: '',
      timestamp: [null, Validators.required],
      dataType: [null, Validators.required],
      legalUsage: '',
      sensorName: '',
      company: ''
    });
  }

  ngOnInit() {
  }

  performUpload(ev: any) {
    this.isUploading = true;
    const formData = new FormData();
    // Populate FormData object with values from FORM
    Object.keys(this.dataForm.value).forEach(k => {
      if (k === 'geojson') {
        formData.append(k, JSON.stringify(JSON.parse(this.dataForm.value[k].replace(/(\r\n|\n|\r)/gm, ''))));
      } else if (k === 'metaData') {
        formData.append(k, JSON.stringify(this.dataForm.value[k]));
      } else if (k === 'timestamp') {
        formData.append(k, JSON.parse(JSON.stringify(new Date(this.dataForm.value[k]))));
      } else {
        formData.append(k, this.dataForm.value[k]);
      }
    });
    if (this.geoFile) {
      formData.append('geoFile', this.geoFile);
    }
    // Make service call to upload data.
    this.uploadService.save(formData).subscribe(
      () => {
        this.isUploading = false;
        this.dataForm.reset();
        console.log('Image data saved successfully');
      },
      error => {
        this.isUploading = false;
        console.error('Error - Save image data failed');
      }
    );
  }

  updateGeoFile(event) {
    this.geoFile = event.target.files[0];
    this.dataForm.updateValueAndValidity({onlySelf: true, emitEvent: true});
  }
}
