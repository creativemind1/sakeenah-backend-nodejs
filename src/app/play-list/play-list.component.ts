import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PlayList } from './playlist';
import { EpisodeWise } from './episodewise';
import { Album } from '../album/album';
import { CmsService } from '../cms.service';
import { FileUpload } from '../file-upload/fileUpload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transporter } from '../album/transporter';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from './../my-dialog/my-dialog.component';
import * as moment from 'moment';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})

export class PlayListComponent implements OnInit {
  constructor(private cmsService: CmsService, public dialog: MatDialog) { }

  DialogData: [];
  album: Album[];
  toppings = new FormControl();
  playList: PlayList = new PlayList();
  albumId: string[];
  selectedPlayList: PlayList = new PlayList();
  deletedPlayList: PlayList;
  dataSource: PlayList[];
  displayedColumns: string[];
  episodes: EpisodeWise[];
  myForm: FormGroup;
  transportMsg: Transporter = new Transporter();
  @Output() parentEvent = new EventEmitter<FileUpload[]>();
  @Output() messageEvent = new EventEmitter<FileUpload>();
  loader: Boolean;

  ngOnInit() {
    this.playList.premium = true;
    this.loadAlbums();
    //this.loadPlaylist();
    this.loadDayslist();
    this.myForm = new FormGroup({
      albumId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      episode: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      playListName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      description: new FormControl({ value: '' }),
      premium: new FormControl({ value: '' }),
      // the rest of inputs with the same approach
    });
  }

  triggerUpdate(event) {
    let albumID = this.albumId
    this.cmsService.getAudioBasedOnAlbum(albumID).subscribe(response => {
      this.displayedColumns = ['Name', 'active', 'create_date', 'albumId', 'episode', 'deleteAction', 'updateAction'];
      var result = JSON.parse(JSON.stringify(response));
      this.dataSource = result.data;
      var myArray = this.dataSource
      for (var i in myArray) {
        myArray[i].create_date = moment(myArray[i].create_date).format('DD-MMM-YYYY')
      }
    });
  }

  onSave() {
    this.playList['type'] = "SAVE";
    if (this.myForm.status === 'VALID') {
      if (this.playList && this.playList.thumbImageUrl && this.playList.thumbImageUrl.length) {
        this.loader = true
        this.cmsService.singleFileupload(this.playList).subscribe(response => {
          this.playList.thumbImageUrl['value'] = response.files[0].path
          this.cmsService.saveOrupdatePlayList(this.playList).subscribe(result => {
            if (result.status == 'SUCCESS') {
              this.loader = false;
              //this.loadPlaylist();
              this.onClear();
            }
          })
        });
      } else {
        alert('Upload mp3 before saving')
      }
    }
    else {
      alert("Error")!
    }
  }

  loadDayslist() {
    this.episodes = [];
    for (let index = 1; index < 31; index++) {
      this.episodes.push({ key: index, value: "Episode " + index })
    }
  }

  loadAlbums() {
    this.cmsService.getAllMedia().subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.album = [];
      this.album = result.message;
    });
  }

  onUpdate() {
    this.selectedPlayList['type'] = "SAVE";
    if (this.myForm.status === 'VALID') {
      this.loader = true;
      console.log(this.selectedPlayList)
      if (this.selectedPlayList && this.selectedPlayList.thumbImageUrl && this.selectedPlayList.thumbImageUrl.length) {
        this.cmsService.singleFileupload(this.selectedPlayList).subscribe(response => {
          this.selectedPlayList.thumbImageUrl['value'] = ''
          this.selectedPlayList.thumbImageUrl['value'] = response.files[0].path
          this.cmsService.saveOrupdatePlayList(this.selectedPlayList).subscribe(result => {
            if (result.status == 'SUCCESS') {
              this.loader = false;
              //this.loadPlaylist();
              this.onClear();
            }
          })
        });
      } else if (this.selectedPlayList) {
        this.cmsService.saveOrupdatePlayList(this.selectedPlayList).subscribe(result => {
          if (result.status == 'SUCCESS') {
            this.loader = false;
            //this.loadPlaylist();
            this.onClear();
          }
        })
      }
    }
    else {
      alert("Error")!
    }
  }

  edit(row) {
    window.scrollTo(0, 0);
    this.onClear();
    this.selectedPlayList = new PlayList();
    this.selectedPlayList = row;
    this.selectedPlayList.enableUpdate = true;
    this.transportMsg.img = this.selectedPlayList.thumbImageUrl;
    this.cmsService.sendMessage(this.transportMsg);
    this.loadAlbums();
    this.loadDayslist();
  }

  receivePlayListSingleFile($event) {
    const files = $event;
    if (files.length) {
      this.playList.thumbImageUrl = files
      // console.log(formData)
      // this.cmsService.singleFileupload(formData).subscribe(response => {
      //   var result = JSON.parse(JSON.stringify(response));
      //   // if (result.success) {
      //   //   this.imgUrl = new FileUpload();
      //   //   this.imgUrl.key = result.files[0].path;
      //   //   this.imgUrl.value = result.files[0].originalname;
      //   //   this.messageEvent.emit(this.imgUrl);
      //   //   this.loader = false;
      //   // }
      // });
    }

  }

  delete(row) {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '500px',
      data: [row, this, 'deletePlayList']
    });
  }

  loadPlaylist() {
    this.cmsService.getAllPlayLists().subscribe(response => {
      this.displayedColumns = ['Name', 'active', 'create_date', 'albumId', 'episode', 'deleteAction', 'updateAction'];
      var result = JSON.parse(JSON.stringify(response));
      this.dataSource = result.message;
      var myArray = this.dataSource
      for (var i in myArray) {
        myArray[i].create_date = moment(myArray[i].create_date).format('DD-MMM-YYYY')
      }
    });
  }

  onClear() {
    this.selectedPlayList = new PlayList();
    this.playList = new PlayList();
    this.playList.premium = true;
    this.transportMsg.img = this.selectedPlayList.thumbImageUrl;
    this.cmsService.sendMessage(this.transportMsg);
  }

  receiveUpdatePlayListSingleFile($event) {
    const files = $event;
    if (files.length) {
      this.selectedPlayList.thumbImageUrl = files
    }
  }
}