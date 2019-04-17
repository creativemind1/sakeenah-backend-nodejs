import { Component, OnInit } from '@angular/core';
import {CmsService} from '../cms.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  filesToUpload: Array<File> = [];
  uploadUrl = environment.uploadUrl;
  constructor(private http:HttpClient,private cmsService:CmsService) { }
  //public uploader: FileUploader = new FileUploader({url: this.uploadUrl, itemAlias: 'photo'});
  ngOnInit() {
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //      console.log('ImageUpload:uploaded:', item, status, response);
         
    //  };
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('===== form data variable : ========   '+ formData.toString());
    this.cmsService.upload(formData).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
     console.log('==== resyult ====',result);
      });
  
}

fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}
}
