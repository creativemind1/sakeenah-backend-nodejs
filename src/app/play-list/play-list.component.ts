import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { PlayList} from './playlist';
import { DayWise} from './daywise';
import { Media} from '../meida/media';
import {CmsService} from '../cms.service';
import{FileUpload} from '../file-upload/fileUpload';
import {FormControl} from '@angular/forms';
import{Transporter} from '../meida/transporter';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent implements OnInit {

 
  constructor(private cmsService:CmsService) { }
  media: Media[];
  toppings = new FormControl();
  playList :PlayList = new PlayList();
  selectedPlayList:PlayList=new PlayList();
  deletedPlayList:PlayList;
  dataSource :PlayList[];
  displayedColumns:string[];
  days:DayWise[];
  transportMsg:Transporter=new Transporter();  
  @Output() parentEvent = new EventEmitter<FileUpload[]>();
  @Output() messageEvent = new EventEmitter<FileUpload>();

  ngOnInit() {
    this.playList.premium=true;
  this.loadMedia();
   this.loadPlaylist();
   this.loadDayslist();
  }
  onSave(){
    
    this.playList['type']="SAVE";
    console.log(' daywise ',this.playList.selectDay);
    this.cmsService.saveOrupdatePlayList(this.playList).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
        this.loadPlaylist();
        this.onClear();
      }else{

      }
  });
  
  }

  loadDayslist(){
   
    this.days=[];
    for (let index = 1; index < 8; index++) {
     this.days.push({key :index,value:"Day "+index})
    }
  }

  loadMedia(){
    this.cmsService.getAllMedia().subscribe(response=>{
    var result=JSON.parse(JSON.stringify(response));
    this.media=[];
     this.media =result.message;
   
    });
  }

  onUpdate(){
    
    this.selectedPlayList['type']="SAVE";
    console.log('Update --- selec Day ',this.selectedPlayList.selectDay);
    this.cmsService.saveOrupdatePlayList(this.selectedPlayList).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
        this.loadPlaylist();
        this.onClear();
      }else{

      }
      
  });
  
  }

  edit(row){
    this.onClear();
    this.selectedPlayList=new PlayList();
    this.selectedPlayList = row;
    this.selectedPlayList.enableUpdate=true;
    
    console.log('edit --- selec Day ',this.selectedPlayList.selectDay);

    this.transportMsg.img=this.selectedPlayList.thumbImageUrl;
    this.cmsService.sendMessage(this.transportMsg);
    this.loadMedia();
    this.loadDayslist();
    
  }
  receivePlayListSingleFile($event) {
    this.playList.thumbImageUrl = $event
    console.log('=== receivePlayListSingleFile ===',this.playList.thumbImageUrl);
  }
  delete(row){
    // your delete code
  
    this.deletedPlayList=row;
    this.deletedPlayList['type']="DELETE";
    this.cmsService.deletePlayList(this.deletedPlayList).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
       this.loadPlaylist();
       this.onClear();
      }else{
      }
  });
  }

  loadPlaylist(){
    this.cmsService.getAllPlayLists().subscribe(response=>{
    this.displayedColumns = ['Name', 'active', 'create_date','deleteAction','updateAction']; 
    var result=JSON.parse(JSON.stringify(response));
     this.dataSource =result.message;
   
    });
  }
 
  onClear() {
    this.selectedPlayList = new PlayList();
    this.playList=new PlayList();
    this.transportMsg.img=this.selectedPlayList.thumbImageUrl;
    this.cmsService.sendMessage(this.transportMsg);
  }
  
  receiveUpdatePlayListSingleFile($event) {
    this.selectedPlayList.thumbImageUrl = $event
  }

}
