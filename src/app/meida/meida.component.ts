import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { SubCategory} from '../subcategory/subcategory';
import { Category} from '../category/category';
import {CmsService} from '../cms.service';
import {Media} from './media';
import {FormControl} from '@angular/forms';
import{FileUpload} from '../file-upload/fileUpload';
import{Transporter} from './transporter';


@Component({
  selector: "[app-meida],[app-single-file-upload]",
  templateUrl: './meida.component.html',
  styleUrls: ['./meida.component.css'],
  providers:[CmsService]
})
export class MeidaComponent implements OnInit {

  constructor(private cmsService:CmsService) { }
  media :Media = new Media();
  category: Category[];
  subCategory: SubCategory[];
  selSubCategory: SubCategory[];
  toppings = new FormControl();
  videoUrls:String[];
  selectedMedia:Media=new Media();
  deletedMedia:Media;
  dataSource :Media[];
  displayedColumns:string[];
  filesToUpload: FileUpload[] = [];
  @Output() parentEvent = new EventEmitter<FileUpload[]>();
  @Output() messageEvent = new EventEmitter<FileUpload>();
  transportMsg:Transporter=new Transporter();
  ngOnInit() {
    this.media.active=true;
    this.media.videoUrl;
    this.loadMedia();
   this.loadCategories();
  }

  loadMedia(){
    this.cmsService.getAllMedia().subscribe(response=>{
    var result=JSON.parse(JSON.stringify(response));
     this.dataSource =result.message;
     this.displayedColumns = ['name', 'active', 'create_date','deleteAction','updateAction']; 
    });
  }
  onSave(){
    this.media['type']="SAVE";
    this.cmsService.saveOrupdateMedia(this.media).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
        this.loadMedia();
        this.onClear();

      }else{
      }
  });
  }

  loadCategories(){
    this.cmsService.getCategories().subscribe(response=>{
    var result=JSON.parse(JSON.stringify(response));
     this.category =result.message;
    });
  }

  onUpdate(){
    this.selectedMedia['type']="SAVE";
    this.cmsService.saveOrupdateMedia(this.selectedMedia).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
        this.loadMedia();
        this.onClear()
      }else{
      }
  });
  }

  edit(row){
    this.onClear();
    this.selectedMedia = row;
    this.selectedMedia.enableUpdate=true;

    this.transportMsg.img=this.selectedMedia.thumbImageUrl;
    this.transportMsg.video=this.selectedMedia.videoUrl;
    this.cmsService.sendMessage(this.transportMsg);
    this.cmsService.getSubCategories(this.selectedMedia).subscribe(response=>{
       var result=JSON.parse(JSON.stringify(response));
        this.subCategory =result.message;
    this.selectedMedia.enableUpdate=true;
    console.log('--- Sub Category ---',this.subCategory,'category ',this.selectedMedia.categoryId,'sub cat id',this.selectedMedia.subCategoryId);
       });
  }

  delete(row){
    // your delete code
    this.deletedMedia=row;
    this.deletedMedia['type']="DELETE";
    this.cmsService.deleteMedia(this.deletedMedia).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
       this.loadMedia();
       this.onClear();
      }else{
      }
  });
  }
  categoryClick(){
    this.cmsService.getSubCategories(this.media).subscribe(response=>{
       var result=JSON.parse(JSON.stringify(response));
        this.subCategory =result.message;
       });
  }

  updatecategoryClick(){
    this.cmsService.getSubCategories(this.selectedMedia).subscribe(response=>{
       var result=JSON.parse(JSON.stringify(response));
        this.subCategory =result.message;
       });
  }

  loadSubCategories(){
    this.cmsService.getAllSubCategories().subscribe(response=>{
    var result=JSON.parse(JSON.stringify(response));
     this.subCategory =result.message;
    });
  }
  receiveMessage($event) {
    this.media.videoUrl=$event;
  }
  receiveSingleFile($event) {
    this.media.thumbImageUrl = $event
  }
 
  receiveUpdateVideoMessage($event) {
    this.selectedMedia.videoUrl=$event;
  }
  receiveUpdateSingleFile($event) {
    this.selectedMedia.thumbImageUrl = $event
  }
  onClear() {
    this.selectedMedia = new Media();
    this.media= new Media();
    this.transportMsg.img=this.selectedMedia.thumbImageUrl;
    this.transportMsg.video=this.selectedMedia.videoUrl;
    this.cmsService.sendMessage(this.transportMsg);
  }

}
