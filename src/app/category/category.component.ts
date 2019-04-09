import { Component, OnInit } from '@angular/core';
import { Category} from './category';
import { CATEGORY} from './mock-category';
import {CmsService} from '../cms.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CmsService]
})
export class CategoryComponent implements OnInit {

  constructor(private cmsService:CmsService) { }
  name:string;
  active=true;
  selectedCategory:Category;
  categories:any =[];
  
  ngOnInit() {
    this.cmsService.getCategories().subscribe(response=>{
      console.log('==== get categories in component ===',response);
      this.categories=response;
    });
  }
  onclick(){
    console.log(' login clicked',this.selectedCategory.name);
  }

  onSelect(selCategory: Category): void {
    this.selectedCategory = selCategory;
    
    console.log('---- Sel Category -----',selCategory);
  }

 
  
  
}


