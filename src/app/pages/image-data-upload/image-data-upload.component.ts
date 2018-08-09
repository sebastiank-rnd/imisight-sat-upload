import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { ImageDataUploadService } from './image-data-upload.service';
import { AuthService } from './../../@auth/auth.service';

@Component({
  selector: 'ngx-image-data-upload',
  templateUrl: './image-data-upload.component.html',
  styleUrls: ['./image-data-upload.component.scss']
})
export class ImageDataUploadComponent implements OnInit {
  token: any;
  dataForm: FormGroup;
  geoFile: any;
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
    this.uploadService.save(formData).subscribe(
      () => {
        this.isUploading = false;
        this.spinner.hide();
        this.alertSuccess = true;
        // setTimeout(() => this.alertSuccess = false, 5000);
        //this.dataForm.reset();
        console.log('Image data saved successfully');
      },
      error => {
        this.isUploading = false;
        this.spinner.hide();
        this.alertFailure = true;
        // setTimeout(() => this.alertFailure = false, 5000);
        console.error('Error - Save image data failed', error);
      }
    );
  }

  updateGeoFile(event) {
    this.geoFile = event.target.files[0];
    this.dataForm.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }
}
