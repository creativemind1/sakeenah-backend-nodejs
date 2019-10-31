import { Component, OnInit, EventEmitter, Output,Input,OnDestroy,ChangeDetectorRef } from "@angular/core";
import { CmsService } from "../cms.service";
import { Observable, Subject ,BehaviorSubject,Subscription} from 'rxjs';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import{FileUpload}from '../file-upload/fileUpload';



@Component({
  selector: 'app-single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.css']
})
export class SingleFileUploadComponent implements OnInit {

  messages: any[] = [];
  subscription: Subscription;
  @Output() messageEvent = new EventEmitter<FileUpload>();
  filesToUpload: Array<File> = [];
  fileNames: Array<String> = [];
  uploadUrl = environment.singleUploadUrl;
  serverBaseUrl = environment.serverBaseUrl;
   imgUrl:FileUpload = new FileUpload;
  
  constructor(private http: HttpClient, private cmsService: CmsService,private ref: ChangeDetectorRef) {
    // subscribe to home component messages
    this.subscription = this.cmsService.getMessage().subscribe(message => {
      console.log('--- Single File Upload ---',message);
      if (message) {
        this.messages.push(message);
        this.imgUrl=this.messages[0].img;
       
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
  ngOnInit() {}

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }
      this.cmsService.singleFileupload(formData).subscribe(response => {
        var result = JSON.parse(JSON.stringify(response));
        if (result.success) {
          this.imgUrl = new FileUpload();
          this.imgUrl.key = result.files[0].path;
          this.imgUrl.value = result.files[0].originalname;
          this.messageEvent.emit(this.imgUrl);
        }
      });
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  onSingleDelete(tempfile:FileUpload){
    this.cmsService.deleteSingleFile(tempfile.key).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.success){
        this.imgUrl=new FileUpload;
      }
      });
  }
  receiveMessage($event) {
    console.log('=== single file upload ===', $event);
    this.imgUrl = $event;
    
  }
}
