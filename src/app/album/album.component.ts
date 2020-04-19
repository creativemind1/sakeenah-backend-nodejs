import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { SubCategory } from '../subcategory/subcategory';
import { Category } from '../category/category';
import { CmsService } from '../cms.service';
import { Album } from './album';
import { FormControl } from '@angular/forms';
import { FileUpload } from '../file-upload/fileUpload';
import { Transporter } from './transporter';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component'
import * as moment from 'moment';

@Component({
  selector: "[app-album],[app-single-file-upload]",
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  providers: [CmsService]
})
export class AlbumComponent implements OnInit {

  constructor(private cmsService: CmsService, public dialog: MatDialog) { }
  DialogData: [];
  album: Album = new Album();
  category: Category[];
  // subCategory: SubCategory[];
  // selSubCategory: SubCategory[];
  toppings = new FormControl();
  videoUrls: String[];
  duration: String[];
  selectedAlbum: Album = new Album();
  deletedMedia: Album;
  dataSource: Album[];
  displayedColumns: string[];
  filesToUpload: FileUpload[] = [];
  @Output() parentEvent = new EventEmitter<FileUpload[]>();
  @Output() messageEvent = new EventEmitter<FileUpload>();
  transportMsg: Transporter = new Transporter();
  sequence: Number[];
  mappingIds: any = {};
  loader: Boolean;


  ngOnInit() {
    this.album.active = true;
    this.album.videoUrl;
    this.loadMedia();
    this.loadCategories();
  }
  loadPlaylist() {
    this.loadMedia();
  }

  loadMedia() {
    this.cmsService.getAllMedia().subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.dataSource = result.message;
      console.log(this.dataSource, '===Data Source===');
      var myArray = this.dataSource;
      for (var i in myArray) {
        myArray[i].create_date = moment(String(myArray[i].create_date)).format('DD-MMM-YYYY');
      }
      this.displayedColumns = ['name', 'active', 'create_date', 'category', 'sequence1', 'deleteAction', 'updateAction'];
    });
  }

  onSave() {
    if (this.album && this.album.title) {
      console.log(this.album, '===this.album===')
      this.album['type'] = "SAVE";
      this.cmsService.saveOrupdateMedia(this.album).subscribe(response => {
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
      this.album.categoryId = [this.category[0].categoryId];
      var obj = {}
      this.category.map((user, j) => {
        var categoryID = user.categoryId;
        var categoryName = user.categoryName;
        obj[categoryID] = categoryName;
      });
      this.mappingIds = obj;
      this.categoryClick();
    });
  }

  onUpdate() {
    if (this.selectedAlbum && this.selectedAlbum.title) {
      this.selectedAlbum['type'] = "SAVE";
      if (this.selectedAlbum && this.selectedAlbum.thumbImageUrl && this.selectedAlbum.thumbImageUrl.length) {
        this.cmsService.singleFileupload(this.selectedAlbum).subscribe(response => {
          this.loader = true;
          this.selectedAlbum.thumbImageUrl['value'] = '';
          this.selectedAlbum.thumbImageUrl['value'] = response.files[0].path;
          this.cmsService.saveOrupdateMedia(this.selectedAlbum).subscribe(response => {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
              this.onClear();
              this.loader = false;
            }
          });
        })
      } else if (this.selectedAlbum) {
        this.cmsService.saveOrupdateMedia(this.selectedAlbum).subscribe(response => {
          var result = JSON.parse(JSON.stringify(response));
          if (result.status == 'SUCCESS') {
            this.loadMedia();
            this.onClear();
            this.loader = false;
          }
        });
      }
    } else {
      alert('Write any name');
    }
  }

  edit(row) {
    this.onClear();
    this.selectedAlbum = row;
    this.selectedAlbum.enableUpdate = true;
    this.transportMsg.img = this.selectedAlbum.thumbImageUrl;
    this.transportMsg.video = this.selectedAlbum.videoUrl;
    this.cmsService.sendMessage(this.transportMsg);
  }

  delete(row) {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '500px',
      data: [row, this, 'deleteMedia']
    });
  }

  categoryClick() {
    this.cmsService.getCategories().subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.album.categoryId = [result.message[0].categoryId];
    });
  }

  updatecategoryClick() {
    this.cmsService.getCategories().subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.album.categoryId = [result.message[0].categoryId]
    });
  }

  loadSubCategories() {
    this.cmsService.getCategories().subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));

    });
  }

  receiveMessage($event) {
    this.album.videoUrl = $event;
  }

  receiveSingleFile($event) {
    this.album.thumbImageUrl = $event
  }

  receiveUpdateVideoMessage($event) {
    this.selectedAlbum.videoUrl = $event;
  }

  receiveUpdateSingleFile($event) {
    this.selectedAlbum.thumbImageUrl = $event
  }

  onClear() {
    this.selectedAlbum = new Album();
    this.album = new Album();
    this.album.active = true;
    this.transportMsg.img = this.selectedAlbum.thumbImageUrl;
    this.transportMsg.video = this.selectedAlbum.videoUrl;
    this.cmsService.sendMessage(this.transportMsg);
    this.loadCategories();
  }
}
