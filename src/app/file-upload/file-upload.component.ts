import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { CmsService } from "../cms.service";
import {
  FileUploader,
  FileSelectDirective
} from "ng2-file-upload/ng2-file-upload";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<Array<String>>();
  filesToUpload: Array<File> = [];
  fileNames: Array<String> = [];
  uploadUrl = environment.uploadUrl;
  serverBaseUrl = environment.serverBaseUrl;
  constructor(private http: HttpClient, private cmsService: CmsService) {}
  ngOnInit() {}

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]["name"]);
    }
    this.cmsService.upload(formData).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.success) {
        for (let i = 0; i < result.files.length; i++) {
          this.fileNames.push(this.serverBaseUrl + files[i]["name"]);
        }
        console.log('== names ===', this.fileNames);
        this.messageEvent.emit(this.fileNames);
      } else {
      }
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
