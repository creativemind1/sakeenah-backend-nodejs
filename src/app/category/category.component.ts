import { Component, OnInit } from '@angular/core';
import { Category} from './category';
//import { CATEGORY} from './mock-category';
import {CmsService} from '../cms.service';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CmsService]
})
export class CategoryComponent implements OnInit {

  constructor(private cmsService:CmsService) { }
  category :Category = new Category();
  
  selectedCategory:Category;
  deletedCategory:Category;
  dataSource :Category[];
  displayedColumns:string[]
  
  ngOnInit() {
    this.category.active=true;
   this.loadCategories();
  }
  onSave(){
    
    this.category['type']="SAVE";
    this.cmsService.saveOrupdateCategory(this.category).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
        this.loadCategories();
        
      }else{

      }
  });
  
  }

  onUpdate(){
    
    this.selectedCategory['type']="SAVE";
    this.cmsService.saveOrupdateCategory(this.selectedCategory).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
        this.loadCategories();
      }else{

      }
      
  });
  
  }

  edit(row){
    this.selectedCategory = row;
    
  }

  delete(row){
    // your delete code
  
    this.deletedCategory=row;
    this.deletedCategory['type']="DELETE";
    console.log('==== Deleted catedory ----',this.deletedCategory);
    this.cmsService.deleteCategory(this.deletedCategory).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
       console.log('=== delete success ===');
       this.loadCategories();
      }else{

      }
  });
  }


  loadCategories(){
    this.cmsService.getCategories().subscribe(response=>{
    this.displayedColumns = ['categoryName', 'active', 'create_date','deleteAction','updateAction']; 
    var result=JSON.parse(JSON.stringify(response));
     this.dataSource =result.message;
   
    });
  }
 
  
  
}


