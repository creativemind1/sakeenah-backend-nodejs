import { Component, OnInit } from '@angular/core';
import { SubCategory } from './subcategory';
import { Category } from '../category/category';
import { CmsService } from '../cms.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css'],
  providers: [CmsService]
})

export class SubcategoryComponent implements OnInit {
  constructor(private cmsService: CmsService) { }

  category: Category[];
  toppings = new FormControl();
  subCategory: SubCategory = new SubCategory();
  selectedSubCategory: SubCategory = new SubCategory();
  deletedSubCategory: SubCategory;
  dataSource: SubCategory[];
  displayedColumns: string[];

  ngOnInit() {
    this.subCategory.active = true;
    this.loadCategories();
    this.loadSubCategories();
  }

  onSave() {
    this.subCategory['type'] = "SAVE";
    this.cmsService.saveOrupdateSubCategory(this.subCategory).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.status == 'SUCCESS') {
        this.loadSubCategories();
        this.onClear();
      }
    });
  }

  loadCategories() {
    this.cmsService.getCategories().subscribe(response => {
      // this.displayedColumns = ['categoryName', 'active', 'create_date','deleteAction','updateAction']; 
      var result = JSON.parse(JSON.stringify(response));
      this.category = result.message;
      this.subCategory.categoryId = [this.category[0].categoryId]
    });
  }

  onUpdate() {
    this.selectedSubCategory['type'] = "SAVE";
    this.cmsService.saveOrupdateSubCategory(this.selectedSubCategory).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.status == 'SUCCESS') {
        this.loadSubCategories();
        this.onClear();
      }
    });
  }

  edit(row) {
    this.selectedSubCategory = new SubCategory();
    this.selectedSubCategory = row;
    this.selectedSubCategory.enableUpdate = true;
    console.log('--- sel sub category ---', this.selectedSubCategory);
    this.loadCategories();

  }

  delete(row) {
    // your delete code

    this.deletedSubCategory = row;
    this.deletedSubCategory['type'] = "DELETE";
    this.cmsService.deleteSubCategory(this.deletedSubCategory).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.status == 'SUCCESS') {
        this.loadSubCategories();
        this.onClear();
      } else {
      }
    });
  }

  loadSubCategories() {
    this.cmsService.getAllSubCategories().subscribe(response => {
      this.displayedColumns = ['categoryName', 'active', 'create_date', 'deleteAction', 'updateAction'];
      var result = JSON.parse(JSON.stringify(response));
      this.dataSource = result.message;
    });
  }

  onClear() {
    this.selectedSubCategory = new SubCategory();
    this.subCategory = new SubCategory();
  }

}
