import { Component, OnInit, EventEmitter, Output, Input, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { CmsService } from "../cms.service";
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FileUpload } from '../file-upload/fileUpload';



@Component({
  selector: 'app-single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.css']
})
export class SingleFileUploadComponent implements OnInit {

  messages: any[] = [];
  subscription: Subscription;
  @Output() messageEvent = new EventEmitter<File[]>();
  @Input() myType : String = '';
  filesToUpload: Array<File> = [];
  fileNames: Array<String> = [];
  uploadUrl = environment.singleUploadUrl;
  serverBaseUrl = environment.serverBaseUrl;
  imgUrl: FileUpload = new FileUpload;
  loader: Boolean;
  constructor(private http: HttpClient, private cmsService: CmsService, private ref: ChangeDetectorRef) {
    // subscribe to home component messages
    this.subscription = this.cmsService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        this.imgUrl = this.messages[0].img;
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  ngOnInit() {    
  }
  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }
      console.log(typeof formData,formData, '===formData===')
      this.loader = true;
      // this.cmsService.singleFileupload(formData).subscribe(response => {
      //   var result = JSON.parse(JSON.stringify(response));
      //   if (result.success) {
      //     this.imgUrl = new FileUpload();
      //     this.imgUrl.key = result.files[0].path;
      //     this.imgUrl.value = result.files[0].originalname;
      //     this.messageEvent.emit(this.imgUrl);
      //     this.loader = false;
      //   }
      // });
    }
  }
  fileChangeEvent(fileInput: any) {
    if (fileInput && fileInput.target.files.length) {
      var inputValue = (<HTMLInputElement>document.getElementById("cin"));
      var imageVal = ['image/png', 'image/jpg', 'image/jpeg'];
      var typeOfFile = String(this.myType) === 'mp3' ? 'audio/mp3' : typeOfFile2;
      var typeOfFile2 = String(this.myType) !== 'mp3' && fileInput && fileInput.target.files.length && imageVal.indexOf(fileInput.target.files[0].type) > -1 ? true : false;      
      if (fileInput.target.files[0].type === typeOfFile || typeOfFile2) {
        if (!typeOfFile2 && fileInput.target.files[0].size < 7248900) {
          this.filesToUpload = <Array<File>>fileInput.target.files;          
        } else {
          if (typeOfFile) {
            inputValue.value = '';
            alert('mp3 size should not exceed 3MB');
            return false
          } else {
            this.filesToUpload = <Array<File>>fileInput.target.files;
          }
        }
      } else {
        inputValue.value = '';
        alert(typeOfFile ? 'Only mp3 is accepted' : 'Only image of type jpg/jpeg/png accepted');
        return false
      }
      const files: Array<File> = this.filesToUpload;
      // const formData: any = new FormData();
      // const files: Array<File> = this.filesToUpload;
      // for (let i = 0; i < files.length; i++) {
      //   formData.append("uploads[]", files[i], files[i]["name"]);
      // }
      // this.imgUrl = new FileUpload();
      // this.imgUrl.key = 'result.files[0].path';
      // this.imgUrl.value = 'mydata';
      this.messageEvent.emit(files);
    }
  }
  onSingleDelete(tempfile: FileUpload) {
    this.cmsService.deleteSingleFile(tempfile.key).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.success) {
        this.imgUrl = new FileUpload;
      }
    });
  }
  receiveMessage($event) {
    this.imgUrl = $event;
  }
}