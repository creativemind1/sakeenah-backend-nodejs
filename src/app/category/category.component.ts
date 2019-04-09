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
  name:string;
  active=true;
  description:string;
  selectedCategory:Category;
  categories:any =[];
  
  ngOnInit() {
    this.cmsService.getCategories().subscribe(response=>{
   //   console.log('==== get categories in component ===',response.message);
    // this.categories=response.message;
    });
  }
  onclick(){
    
    this.category.type="SAVE";
    this.cmsService.saveNewCategory(this.category).subscribe(response=>{
      
  });
  }

  onSelect(selCategory: Category): void {
    this.selectedCategory = selCategory;
    
    console.log('---- Sel Category -----',selCategory);
  }

 
  
  
}


