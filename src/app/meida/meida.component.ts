import { Component, OnInit } from '@angular/core';
import { SubCategory} from '../subcategory/subcategory';
import { Category} from '../category/category';
import {CmsService} from '../cms.service';
import {Media} from './media';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-meida',
  templateUrl: './meida.component.html',
  styleUrls: ['./meida.component.css'],
  providers:[CmsService]
})
export class MeidaComponent implements OnInit {

  constructor(private cmsService:CmsService) { }
  media :Media = new Media();
  tempMedia :Media = new Media();
  category: Category[];
  subCategory: SubCategory[];
  selSubCategory: SubCategory[];
  toppings = new FormControl();
  videoUrls:String[];
  selectedMedia:Media;
  deletedMedia:Media;
  dataSource :Media[];
  displayedColumns:string[];
  filesToUpload: Array<String> = [];
  
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
      }else{
      }
  });
  }

  edit(row){
    this.selectedMedia = row;
    this.cmsService.getSubCategories(this.selectedMedia).subscribe(response=>{
       var result=JSON.parse(JSON.stringify(response));
        this.subCategory =result.message;
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
    this.filesToUpload = $event
    this.media.videoUrl=this.filesToUpload;
    console.log('== Test ===',this.media.videoUrl);
  }
}
