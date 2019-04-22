import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { CmsService } from "../cms.service";
import { Observable, Subject ,BehaviorSubject,Subscription} from 'rxjs';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import{FileUpload}from './fileUpload';
import * as _ from 'lodash';

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<FileUpload[]>();
  filesToUpload: Array<File> = [];
  uploadUrl = environment.uploadUrl;
  serverBaseUrl = environment.serverBaseUrl;
  playlist:FileUpload[]= [];
  fileupload :FileUpload;
  subscription: Subscription;
  messages: any[] = [];
  constructor(private http: HttpClient, private cmsService: CmsService) {
      // subscribe to home component messages
  this.subscription = this.cmsService.getMessage().subscribe(message => {
    if (message) {
      this.messages.push(message);
      this.playlist=this.messages[0].video;
     
    } else {
      // clear messages when empty message received
      this.messages = [];
    }
  });
  }
  ngOnInit() {}




  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]["name"]);
    }
    this.cmsService.upload(formData).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.success) {
        for (let i = 0; i < result.files.length; i++) {
          this.fileupload= new FileUpload();
          this.fileupload.key=result.files[i].path;
          this.fileupload.value=result.files[i].originalname;
          this.playlist.push(this.fileupload);
        }
        this.messageEvent.emit(this.playlist);
      } else {
      }
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  deleteFile(tempfile:FileUpload){
    this.cmsService.deleteSingleFile(tempfile.key).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.success){
        _.pull(this.playlist,tempfile);  
      
      }
      });
  }
  receiveMessage($event) {
    this.playlist = $event
  }
}
