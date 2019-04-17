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
  toppings = new FormControl();
 
  selectedMedia:Media;
  deletedMedia:Media;
  dataSource :Media[];
  displayedColumns:string[];

  
  ngOnInit() {
    this.media.active=true;
    this.loadMedia();
   this.loadCategories();
   this.loadSubCategories();
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
    //this.selectedMedia = row;
  
   
    this.tempMedia= row;
    this.selectedMedia=this.tempMedia;
    // this.loadCategories();
    // this.loadSubCategories();
    
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


  loadSubCategories(){
    this.cmsService.getAllSubCategories().subscribe(response=>{
   // this.displayedColumns = ['categoryName', 'active', 'create_date','deleteAction','updateAction']; 
    var result=JSON.parse(JSON.stringify(response));
     this.subCategory =result.message;
   console.log('=== Sub category ===',this.subCategory );
    });
  }
}
