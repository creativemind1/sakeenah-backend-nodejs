import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SubCategory } from '../subcategory/subcategory';
import { Category } from '../category/category';
import { CmsService } from '../cms.service';
import { Media } from './media';
import { FormControl } from '@angular/forms';
import { FileUpload } from '../file-upload/fileUpload';
import { Transporter } from './transporter';
import {MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from './../my-dialog/my-dialog.component'

@Component({
  selector: "[app-media],[app-single-file-upload]",
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  providers: [CmsService]
})
export class MediaComponent implements OnInit {

  constructor(private cmsService: CmsService, public dialog: MatDialog) { }
  DialogData: [];
  media: Media = new Media();
  category: Category[];
  subCategory: SubCategory[];
  selSubCategory: SubCategory[];
  toppings = new FormControl();
  videoUrls: String[];
  selectedMedia: Media = new Media();
  deletedMedia: Media;
  dataSource: Media[];
  displayedColumns: string[];
  filesToUpload: FileUpload[] = [];
  @Output() parentEvent = new EventEmitter<FileUpload[]>();
  @Output() messageEvent = new EventEmitter<FileUpload>();
  transportMsg: Transporter = new Transporter();
  ngOnInit() {
    this.media.active = true;
    this.media.videoUrl;
    this.loadMedia();
    this.loadCategories();
  }
  loadPlaylist () {
    this.loadMedia();
  }
  loadMedia() {
    this.cmsService.getAllMedia().subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.dataSource = result.message;
      this.displayedColumns = ['name', 'active', 'create_date', 'deleteAction', 'updateAction'];
    });
  }
  onSave() {
    if(this.media && this.media.title) {
      this.media['type'] = "SAVE";
      this.cmsService.saveOrupdateMedia(this.media).subscribe(response => {
        var result = JSON.parse(JSON.stringify(response));
        if (result.status == 'SUCCESS') {
          this.loadMedia();
          this.onClear();
        }
      });
    } else {
      alert('Write any name')
    }
  }

  loadCategories() {
    this.cmsService.getCategories().subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.category = result.message;
      this.media.categoryId = [this.category[0].categoryId]
      this.categoryClick();
    });
  }

  onUpdate() {
    if(this.selectedMedia && this.selectedMedia.title) {
      this.selectedMedia['type'] = "SAVE";
      this.cmsService.saveOrupdateMedia(this.selectedMedia).subscribe(response => {
        var result = JSON.parse(JSON.stringify(response));
        if (result.status == 'SUCCESS') {
          this.loadMedia();
          this.onClear()
        } else {
        }
      });
    } else {
      alert('Write any name')
    }
  }
  edit(row) {
    this.onClear();
    this.selectedMedia = row;
    this.selectedMedia.enableUpdate = true;
    this.transportMsg.img = this.selectedMedia.thumbImageUrl;
    this.transportMsg.video = this.selectedMedia.videoUrl;
    this.cmsService.sendMessage(this.transportMsg);
    this.cmsService.getSubCategories(this.selectedMedia).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.subCategory = result.message;
      this.selectedMedia.enableUpdate = true;
    });
  }

  delete(row) {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '500px',
      data: [row, this, 'deleteMedia']      
    });
  }
  categoryClick() {
    this.cmsService.getSubCategories(this.media).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.subCategory = result.message;
      this.media.subCategoryId = [result.message[0].subCategoryId];
    });
  }

  updatecategoryClick() {
    this.cmsService.getSubCategories(this.selectedMedia).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.media.subCategoryId = [result.message[0].subCategoryId]
    });
  }

  loadSubCategories() {
    this.cmsService.getAllSubCategories().subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.subCategory = result.message;
    });
  }
  receiveMessage($event) {
    this.media.videoUrl = $event;
  }
  receiveSingleFile($event) {
    this.media.thumbImageUrl = $event
  }

  receiveUpdateVideoMessage($event) {
    this.selectedMedia.videoUrl = $event;
  }
  receiveUpdateSingleFile($event) {
    this.selectedMedia.thumbImageUrl = $event
  }
  onClear() {
    this.selectedMedia = new Media();
    this.media = new Media();
    this.media.active = true;
    this.transportMsg.img = this.selectedMedia.thumbImageUrl;
    this.transportMsg.video = this.selectedMedia.videoUrl;
    this.cmsService.sendMessage(this.transportMsg);
    this.loadCategories();
  }
}
