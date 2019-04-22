import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from './category';
import { CmsService } from '../cms.service';
import {MatPaginator,MatTableDataSource,MatSortModule} from '@angular/material'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CmsService]
})
export class CategoryComponent implements OnInit {

  constructor(private cmsService: CmsService) { }
  category: Category = new Category();

  selectedCategory: Category = new Category();
  deletedCategory: Category;
  dataSource=new MatTableDataSource<Category>([]);
  displayedColumns: string[];
  @ViewChild (MatPaginator)paginator: MatPaginator;


  ngOnInit() {
    this.category.active = true;
    this.loadCategories();
  }
  onSave() {

    this.category['type'] = "SAVE";
    this.cmsService.saveOrupdateCategory(this.category).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.status == 'SUCCESS') {
        this.loadCategories();
        this.onClear();
      } else {

      }
    });

  }

  onUpdate() {

    this.selectedCategory['type'] = "SAVE";
    this.cmsService.saveOrupdateCategory(this.selectedCategory).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.status == 'SUCCESS') {
        this.loadCategories();
        this.onClear();
      } else {

      }

    });

  }

  edit(row) {
    this.selectedCategory = new Category();
    this.selectedCategory = row;
    this.selectedCategory.enableUpdate = true;

  }

  delete(row) {
    // your delete code

    this.deletedCategory = row;
    this.deletedCategory['type'] = "DELETE";
    this.cmsService.deleteCategory(this.deletedCategory).subscribe(response => {
      var result = JSON.parse(JSON.stringify(response));
      if (result.status == 'SUCCESS') {
        this.loadCategories();
        this.onClear();
      } else {

      }
    });
  }


  loadCategories() {

    this.cmsService.getCategories().subscribe(response => {
      this.displayedColumns = ['categoryName', 'active', 'create_date', 'deleteAction', 'updateAction'];
      var result = JSON.parse(JSON.stringify(response));
      this.dataSource = result.message;
      this.dataSource.paginator=this.paginator;
      console.log('--- Load Category ---',this.dataSource.paginator);

    });
  }

  onClear() {
    this.category= new Category();
    this.selectedCategory= new Category();
  }


}


