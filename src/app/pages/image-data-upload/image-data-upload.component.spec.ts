import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDataUploadComponent } from './image-data-upload.component';

describe('ImageDataUploadComponent', () => {
  let component: ImageDataUploadComponent;
  let fixture: ComponentFixture<ImageDataUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDataUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
