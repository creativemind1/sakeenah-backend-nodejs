import { Component, OnInit } from '@angular/core';
import { SubCategory} from './subcategory';
import { Category} from '../category/category';
import {CmsService} from '../cms.service';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css'],
  providers:[CmsService]
})
export class SubcategoryComponent implements OnInit {

  constructor(private cmsService:CmsService) { }
  category: Category[];
  toppings = new FormControl();
  
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];
  subCategory :SubCategory = new SubCategory();
  selectedSubCategory:SubCategory;
  deletedSubCategory:SubCategory;
  dataSource :SubCategory[];
  displayedColumns:string[];

  
  ngOnInit() {
    this.subCategory.active=true;
  this.loadCategories();
   this.loadSubCategories();
  }
  onSave(){
    
    this.subCategory['type']="SAVE";
    //this.subCategory.categoryId=this.toppings.value;

    console.log('---- SUb categiry Saved ---',this.subCategory);
    this.cmsService.saveOrupdateSubCategory(this.subCategory).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
        this.loadSubCategories();
      }else{

      }
  });
  
  }

  loadCategories(){
    this.cmsService.getCategories().subscribe(response=>{
   // this.displayedColumns = ['categoryName', 'active', 'create_date','deleteAction','updateAction']; 
    var result=JSON.parse(JSON.stringify(response));
     this.category =result.message;
   
    });
  }

  onUpdate(){
    
    this.selectedSubCategory['type']="SAVE";
    console.log('===== onUpdate =====',this.selectedSubCategory);
    this.cmsService.saveOrupdateSubCategory(this.selectedSubCategory).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
        this.loadSubCategories();
       
      }else{

      }
      
  });
  
  }

  edit(row){
    this.selectedSubCategory = row;
    console.log('===== Edit =====',this.selectedSubCategory,' topping ',this.toppings.value);
    this.loadCategories();
    
    
  }

  delete(row){
    // your delete code
  
    this.deletedSubCategory=row;
    this.deletedSubCategory['type']="DELETE";
    console.log('==== Deleted catedory ----',this.deletedSubCategory);
    this.cmsService.deleteSubCategory(this.deletedSubCategory).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
       console.log('=== delete success ===');
       this.loadSubCategories();
      }else{

      }
  });
  }


  loadSubCategories(){
    this.cmsService.getAllSubCategories().subscribe(response=>{
    this.displayedColumns = ['categoryName', 'active', 'create_date','deleteAction','updateAction']; 
    var result=JSON.parse(JSON.stringify(response));
     this.dataSource =result.message;
   
    });
  }
 
  
  
}
