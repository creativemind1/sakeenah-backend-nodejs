import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PlayList } from './playlist';
import { DayWise } from './daywise';
import { Media } from '../media/media';
import { CmsService } from '../cms.service';
import { FileUpload } from '../file-upload/fileUpload';
import { FormControl } from '@angular/forms';
import { Transporter } from '../media/transporter';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from './../my-dialog/my-dialog.component'

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})

export class PlayListComponent implements OnInit {
  constructor(private cmsService: CmsService, public dialog: MatDialog) { }
  DialogData: [];
  media: Media[];
  toppings = new FormControl();
  playList: PlayList = new PlayList();
  selectedPlayList: PlayList = new PlayList();
  deletedPlayList: PlayList;
  dataSource: PlayList[];
  displayedColumns: string[];
  days: DayWise[];
  transportMsg: Transporter = new Transporter();
  @Output() parentEvent = new EventEmitter<FileUpload[]>();
  @Output() messageEvent = new EventEmitter<FileUpload>();

  ngOnInit() {
    this.playList.premium = false;
    this.loadMedia();
    this.loadPlaylist();
    this.loadDayslist();
  }

  onSave() {
    this.playList['type'] = "SAVE";
    this.cmsService.saveOrupdatePlayList(this.playList).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.status == 'SUCCESS') {
        this.loadPlaylist();
        this.onClear();
      }
    });
  }

  loadDayslist() {
    this.days = [];
    for (let index = 1; index < 8; index++) {
      this.days.push({ key: index, value: "Day " + index })
    }
  }

  loadMedia() {
    this.cmsService.getAllMedia().subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      this.media = [];
      this.media = result.message;
    });
  }

  onUpdate() {
    this.selectedPlayList['type'] = "SAVE";
    this.cmsService.saveOrupdatePlayList(this.selectedPlayList).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.status == 'SUCCESS') {
        this.loadPlaylist();
        this.onClear();
      }
    });
  }

  edit(row) {
    this.onClear();
    this.selectedPlayList = new PlayList();
    this.selectedPlayList = row;
    this.selectedPlayList.enableUpdate = true;
    this.transportMsg.img = this.selectedPlayList.thumbImageUrl;
    this.cmsService.sendMessage(this.transportMsg);
    this.loadMedia();
    this.loadDayslist();
  }
  receivePlayListSingleFile($event) {
    this.playList.thumbImageUrl = $event
  }
  delete(row) {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '500px',
      data: [row, this, 'deletePlayList']
    });
  }

  loadPlaylist() {
    this.cmsService.getAllPlayLists().subscribe(response => {
      this.displayedColumns = ['Name', 'active', 'create_date', 'deleteAction', 'updateAction'];
      var result = JSON.parse(JSON.stringify(response));
      this.dataSource = result.message;
    });
  }

  onClear() {
    this.selectedPlayList = new PlayList();
    this.playList = new PlayList();
    this.playList.premium = false;
    this.transportMsg.img = this.selectedPlayList.thumbImageUrl;
    this.cmsService.sendMessage(this.transportMsg);
  }

  receiveUpdatePlayListSingleFile($event) {
    this.selectedPlayList.thumbImageUrl = $event
  }
}