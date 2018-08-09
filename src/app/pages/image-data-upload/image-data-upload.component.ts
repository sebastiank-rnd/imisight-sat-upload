import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, tap, map, last } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

import { ImageDataUploadService } from './image-data-upload.service';
import { AuthService } from './../../@auth/auth.service';

import { IA3DataItem } from './IA3DataItem';
import { getLocaleDateTimeFormat } from '../../../../node_modules/@angular/common';


@Component({
  selector: 'ngx-image-data-upload',
  templateUrl: './image-data-upload.component.html',
  styleUrls: ['./image-data-upload.component.scss']
})
export class ImageDataUploadComponent implements OnInit {
  token: any;
  dataForm: FormGroup;
  geoFile: any;
  uploadProgress = 0;
  isUploading = false;
  alertSuccess = false;
  alertFailure = false;


  constructor(public formBuilder: FormBuilder,
    private auth: AuthService,
    private uploadService: ImageDataUploadService,
    private spinner: NgxSpinnerService) {

    this.token = auth.parseJwt(auth.idToken);

    this.dataForm = formBuilder.group({
      geoFile: '',
      fileName: '',
      timestamp: [null, Validators.required],
      dataType: 'orthophoto',
      legalUsage: '',
      sensorName: 'Unknown',
      company: this.token['https://imisight.net/user_metadata'].companyId
    });
  }

  ngOnInit() {
  }

  performUpload(ev: any) {
    this.isUploading = true;
    this.spinner.show();
    this.alertSuccess = false;
    this.alertFailure = false;

    const startTime = Date.now();
    const formData = new FormData();
    // Populate FormData object with values from FORM
    Object.keys(this.dataForm.value).forEach(k => {
      if (k === 'metaData') {
        formData.append(k, JSON.stringify(this.dataForm.value[k]));
      } else if (k === 'timestamp') {
        formData.append(k, JSON.parse(JSON.stringify(new Date(this.dataForm.value[k]))));
      } else {
        formData.append(k, this.dataForm.value[k]);
      }

      if (k === 'geojson') {
        formData.append(k, JSON.stringify(JSON.parse(this.dataForm.value[k].replace(/(\r\n|\n|\r)/gm, ''))));
      }
    });
    if (this.geoFile) {
      formData.append('geoFile', this.geoFile);
    }
    // Make service call to upload data.
    const response = this.uploadService.save(formData)
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Upload started');
              break;
            case HttpEventType.DownloadProgress:
            // Live stats are also possible for downloads
            case HttpEventType.UploadProgress:
              if (event.total) {
                const progress = Math.round(event.loaded / event.total * 100);
                if (progress > this.uploadProgress) {
                  this.uploadProgress = progress;
                }
                break;
              }
            case HttpEventType.Response:
              this.isUploading = false;
              this.spinner.hide();
              this.alertSuccess = true;
              this.uploadProgress = 0;
              // setTimeout(() => this.alertSuccess = false, 5000);
              //this.dataForm.reset();
              console.log('Image data saved successfully');
              break;
          }
          return event;
        }),
        last(),
        catchError(err => {
          const errorMsg = err.message || 'Unable to retrieve data';

          this.isUploading = false;
          this.spinner.hide();
          this.alertFailure = true;
          this.uploadProgress = 0;
          // setTimeout(() => this.alertFailure = false, 5000);
          console.error('Error - Save image data failed', err)
          return throwError(errorMsg);
        })
      );
      console.log(response);
  }

  updateGeoFile(event) {
    this.geoFile = event.target.files[0];
    this.dataForm.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }
}
