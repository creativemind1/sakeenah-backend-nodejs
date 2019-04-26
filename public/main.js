(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _category_category_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./category/category.component */ "./src/app/category/category.component.ts");
/* harmony import */ var _subcategory_subcategory_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./subcategory/subcategory.component */ "./src/app/subcategory/subcategory.component.ts");
/* harmony import */ var _meida_meida_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./meida/meida.component */ "./src/app/meida/meida.component.ts");
/* harmony import */ var _reset_pswd_reset_pswd_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reset-pswd/reset-pswd.component */ "./src/app/reset-pswd/reset-pswd.component.ts");








var routes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'reset', component: _reset_pswd_reset_pswd_component__WEBPACK_IMPORTED_MODULE_7__["ResetPswdComponent"] },
    { path: 'category', component: _category_category_component__WEBPACK_IMPORTED_MODULE_4__["CategoryComponent"] },
    { path: 'subcategory', component: _subcategory_subcategory_component__WEBPACK_IMPORTED_MODULE_5__["SubcategoryComponent"] },
    { path: 'media', component: _meida_meida_component__WEBPACK_IMPORTED_MODULE_6__["MeidaComponent"] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n\n<section>\n        \n<router-outlet></router-outlet>\n</section>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'frontend';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _category_category_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./category/category.component */ "./src/app/category/category.component.ts");
/* harmony import */ var _subcategory_subcategory_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./subcategory/subcategory.component */ "./src/app/subcategory/subcategory.component.ts");
/* harmony import */ var _meida_meida_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./meida/meida.component */ "./src/app/meida/meida.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _menu_menu_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./menu/menu.component */ "./src/app/menu/menu.component.ts");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var angular_material_fileupload__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! angular-material-fileupload */ "./node_modules/angular-material-fileupload/matFileUpload.esm.js");
/* harmony import */ var _file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./file-upload/file-upload.component */ "./src/app/file-upload/file-upload.component.ts");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _single_file_upload_single_file_upload_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./single-file-upload/single-file-upload.component */ "./src/app/single-file-upload/single-file-upload.component.ts");
/* harmony import */ var _reset_pswd_reset_pswd_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./reset-pswd/reset-pswd.component */ "./src/app/reset-pswd/reset-pswd.component.ts");





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _category_category_component__WEBPACK_IMPORTED_MODULE_7__["CategoryComponent"],
                _subcategory_subcategory_component__WEBPACK_IMPORTED_MODULE_8__["SubcategoryComponent"],
                _meida_meida_component__WEBPACK_IMPORTED_MODULE_9__["MeidaComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"],
                _menu_menu_component__WEBPACK_IMPORTED_MODULE_14__["MenuComponent"],
                _file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_17__["FileUploadComponent"],
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_18__["FileSelectDirective"],
                _single_file_upload_single_file_upload_component__WEBPACK_IMPORTED_MODULE_19__["SingleFileUploadComponent"],
                _reset_pswd_reset_pswd_component__WEBPACK_IMPORTED_MODULE_20__["ResetPswdComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_12__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSlideToggleModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSelectModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], angular_material_fileupload__WEBPACK_IMPORTED_MODULE_16__["MatFileUploadModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSortModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatToolbarModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_15__["JwtModule"].forRoot({
                    config: {
                        tokenGetter: function tokenGetter() {
                            return localStorage.getItem('access_token');
                        },
                        whitelistedDomains: ['/subcategory', 'l/category', '/media'],
                        blacklistedRoutes: ['/login']
                    }
                })
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/category/category.component.css":
/*!*************************************************!*\
  !*** ./src/app/category/category.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n  .example-container {\n    display: flex;\n    flex-direction: column;\n  }\n  .example-container > * {\n    width: 100%;\n  }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2F0ZWdvcnkvY2F0ZWdvcnkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7RUFDYjtFQUNBO0lBQ0UsYUFBYTtJQUNiLHNCQUFzQjtFQUN4QjtFQUVBO0lBQ0UsV0FBVztFQUNiIiwiZmlsZSI6InNyYy9hcHAvY2F0ZWdvcnkvY2F0ZWdvcnkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuZXhhbXBsZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICBcbiAgLmV4YW1wbGUtY29udGFpbmVyID4gKiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgIl19 */"

/***/ }),

/***/ "./src/app/category/category.component.html":
/*!**************************************************!*\
  !*** ./src/app/category/category.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-menu></app-menu>\n\n<div >\n  <mat-card >\n  <mat-card-header fxLayoutAlign=\"center\">\n     <mat-card-title>Category</mat-card-title>\n  </mat-card-header>\n  <div *ngIf=\"selectedCategory.enableUpdate; else save\">\n    <!-- Update UI-->\n    <mat-card-content  fxLayout=\"column\" fxLayoutAlign=\"center\">\n        <mat-form-field>\n          <input matInput placeholder=\"Name\" [(ngModel)]=\"selectedCategory.categoryName\"  >\n        </mat-form-field>\n        <mat-form-field>\n          <textarea matInput placeholder=\"Description\" [(ngModel)]=\"selectedCategory.description\" ></textarea>\n        </mat-form-field>\n         <mat-slide-toggle [(ngModel)]=\"selectedCategory.active\"> Slide me!</mat-slide-toggle>\n        \n     </mat-card-content>\n     <!-- <mat-card-actions  align=\"centre\" >\n        <button mat-raised-button color=\"primary\" (click)=\"onclick()\" >cancel</button>\n     </mat-card-actions> -->\n     <mat-card-actions align=\"center\">\n        <button mat-raised-button color=\"primary\" (click)=\"onUpdate()\" >Update</button>\n        <button mat-raised-button color=\"primary\" (click)=\"onClear()\" >Clear</button>\n     </mat-card-actions>\n     \n  </div>\n  <ng-template #save>\n\n    <!--SAVE UI-->\n  <mat-card-content fxLayout=\"column\" fxLayoutAlign=\"center \">\n\n     \n     <mat-form-field >\n       <input matInput placeholder=\"Name\" [(ngModel)]=\"category.categoryName\"  >\n     </mat-form-field>\n      \n     \n     <mat-form-field>\n     <textarea matInput placeholder=\"Description\" [(ngModel)]=\"category.description\" ></textarea>\n    </mat-form-field>\n      \n     \n  </mat-card-content>\n  <mat-slide-toggle [(ngModel)]=\"category.active\"> Slide me!</mat-slide-toggle>\n  <mat-card-actions align=\"center\">\n     <button mat-raised-button color=\"primary\" (click)=\"onSave()\" >Save</button>\n  </mat-card-actions>\n  \n</ng-template>\n  \n  <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"categoryName\">\n      <th mat-header-cell *matHeaderCellDef> Name </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.categoryName}} </td>\n    </ng-container>\n  \n    <!-- Weight Column -->\n    <ng-container matColumnDef=\"active\">\n      <th mat-header-cell *matHeaderCellDef> Active </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.active}} </td>\n    </ng-container>\n  \n    <!-- Symbol Column -->\n    <ng-container matColumnDef=\"create_date\">\n      <th mat-header-cell *matHeaderCellDef> Inserted Date </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.create_date}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"updateAction\">\n        <th mat-header-cell *matHeaderCellDef> Update </th>\n          <td mat-cell *matCellDef=\"let element\"><i class=\"material-icons\" (click)=\"edit(element)\">edit</i>\n    </ng-container>\n  \n    <ng-container matColumnDef=\"deleteAction\">\n        <th mat-header-cell *matHeaderCellDef> Delete </th>\n          <td mat-cell *matCellDef=\"let element\"><i class=\"material-icons\" (click)=\"delete(element)\">delete</i>\n    </ng-container> \n  \n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n     <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr> \n  </table>\n  <!-- <mat-paginator [pageSizeOptions]=\"[1, 10, 20]\" showFirstLastButtons></mat-paginator> -->\n\n  </mat-card>\n  </div>"

/***/ }),

/***/ "./src/app/category/category.component.ts":
/*!************************************************!*\
  !*** ./src/app/category/category.component.ts ***!
  \************************************************/
/*! exports provided: CategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryComponent", function() { return CategoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _category__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category */ "./src/app/category/category.ts");
/* harmony import */ var _cms_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cms.service */ "./src/app/cms.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");





var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(cmsService) {
        this.cmsService = cmsService;
        this.category = new _category__WEBPACK_IMPORTED_MODULE_2__["Category"]();
        this.selectedCategory = new _category__WEBPACK_IMPORTED_MODULE_2__["Category"]();
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"]([]);
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.category.active = true;
        this.loadCategories();
    };
    CategoryComponent.prototype.onSave = function () {
        var _this = this;
        this.category['type'] = "SAVE";
        this.cmsService.saveOrupdateCategory(this.category).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.loadCategories();
                _this.onClear();
            }
            else {
            }
        });
    };
    CategoryComponent.prototype.onUpdate = function () {
        var _this = this;
        this.selectedCategory['type'] = "SAVE";
        this.cmsService.saveOrupdateCategory(this.selectedCategory).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.loadCategories();
                _this.onClear();
            }
            else {
            }
        });
    };
    CategoryComponent.prototype.edit = function (row) {
        this.selectedCategory = new _category__WEBPACK_IMPORTED_MODULE_2__["Category"]();
        this.selectedCategory = row;
        this.selectedCategory.enableUpdate = true;
    };
    CategoryComponent.prototype.delete = function (row) {
        // your delete code
        var _this = this;
        this.deletedCategory = row;
        this.deletedCategory['type'] = "DELETE";
        this.cmsService.deleteCategory(this.deletedCategory).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.loadCategories();
                _this.onClear();
            }
            else {
            }
        });
    };
    CategoryComponent.prototype.loadCategories = function () {
        var _this = this;
        this.cmsService.getCategories().subscribe(function (response) {
            _this.displayedColumns = ['categoryName', 'active', 'create_date', 'deleteAction', 'updateAction'];
            var result = JSON.parse(JSON.stringify(response));
            _this.dataSource = result.message;
            _this.dataSource.paginator = _this.paginator;
            console.log('--- Load Category ---', _this.dataSource.paginator);
        });
    };
    CategoryComponent.prototype.onClear = function () {
        this.category = new _category__WEBPACK_IMPORTED_MODULE_2__["Category"]();
        this.selectedCategory = new _category__WEBPACK_IMPORTED_MODULE_2__["Category"]();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"])
    ], CategoryComponent.prototype, "paginator", void 0);
    CategoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-category',
            template: __webpack_require__(/*! ./category.component.html */ "./src/app/category/category.component.html"),
            providers: [_cms_service__WEBPACK_IMPORTED_MODULE_3__["CmsService"]],
            styles: [__webpack_require__(/*! ./category.component.css */ "./src/app/category/category.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_cms_service__WEBPACK_IMPORTED_MODULE_3__["CmsService"]])
    ], CategoryComponent);
    return CategoryComponent;
}());



/***/ }),

/***/ "./src/app/category/category.ts":
/*!**************************************!*\
  !*** ./src/app/category/category.ts ***!
  \**************************************/
/*! exports provided: Category */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Category", function() { return Category; });
var Category = /** @class */ (function () {
    function Category() {
    }
    return Category;
}());



/***/ }),

/***/ "./src/app/cms.service.ts":
/*!********************************!*\
  !*** ./src/app/cms.service.ts ***!
  \********************************/
/*! exports provided: CmsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmsService", function() { return CmsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _jwt_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./jwt.service */ "./src/app/jwt.service.ts");







var CmsService = /** @class */ (function () {
    function CmsService(http, jwtService) {
        this.http = http;
        this.jwtService = jwtService;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.companyId = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].companyId;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl;
        this.loginUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].loginUrl;
        this.uploadUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].uploadUrl;
        this.singleUploadUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].singleUploadUrl;
        this.serverBaseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].serverBaseUrl;
        this.updateIBOsNavigationSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"]('');
    }
    // Load all the categories based on the company Id
    CmsService.prototype.getCategories = function () {
        var token = localStorage.getItem('access_token');
        return this.http.post(this.baseUrl + '/category', { "type": "LOAD",
            "companyId": this.companyId, 'token': token }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    //Save or Update Category
    CmsService.prototype.saveOrupdateCategory = function (category) {
        var token = localStorage.getItem('access_token');
        category['token'] = token;
        category.companyId = this.companyId;
        return this.http.post(this.baseUrl + '/category', category).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    //Delete Category
    CmsService.prototype.deleteCategory = function (category) {
        var token = localStorage.getItem('access_token');
        category['token'] = token;
        return this.http.post(this.baseUrl + '/category', category).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    // Load all the Sub categories based on the company Id
    CmsService.prototype.getAllSubCategories = function () {
        var token = localStorage.getItem('access_token');
        return this.http.post(this.baseUrl + '/subcategory', { "type": "LOAD",
            "companyId": this.companyId, 'token': token }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    //Save or Update Sub Category
    CmsService.prototype.saveOrupdateSubCategory = function (subCategory) {
        subCategory.companyId = this.companyId;
        var token = localStorage.getItem('access_token');
        subCategory['token'] = token;
        return this.http.post(this.baseUrl + '/subcategory', subCategory).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    //Delete Sub Category
    CmsService.prototype.deleteSubCategory = function (subCategory) {
        var token = localStorage.getItem('access_token');
        subCategory['token'] = token;
        return this.http.post(this.baseUrl + '/subcategory', subCategory).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    // Load all the Media based on the company Id
    CmsService.prototype.getAllMedia = function () {
        var token = localStorage.getItem('access_token');
        return this.http.post(this.baseUrl + '/media', { "type": "LOAD",
            "companyId": this.companyId, 'token': token }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    //Save or Update Sub Category
    CmsService.prototype.saveOrupdateMedia = function (media) {
        media.companyId = this.companyId;
        var token = localStorage.getItem('access_token');
        media['token'] = token;
        return this.http.post(this.baseUrl + '/media', media).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    //Delete Sub Category
    CmsService.prototype.deleteMedia = function (media) {
        var token = localStorage.getItem('access_token');
        media['token'] = token;
        return this.http.post(this.baseUrl + '/media', media).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    //Single file
    CmsService.prototype.singleFileupload = function (formData) {
        return this.http.post(this.singleUploadUrl, formData).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    // L
    //Delete Sub Category
    CmsService.prototype.upload = function (formData) {
        return this.http.post(this.uploadUrl, formData).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            console.log('--- upload video ---', resp);
            return resp;
        }));
    };
    ;
    // Load all the Sub categories based on the company Id
    CmsService.prototype.getSubCategories = function (media) {
        var token = localStorage.getItem('access_token');
        return this.http.post(this.baseUrl + '/subcategory', { "type": "GET_SUB_CATEGORY",
            "companyId": this.companyId, 'categoryId': media.categoryId, 'token': token }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    //Delete file
    CmsService.prototype.deleteSingleFile = function (fileurl) {
        return this.http.post(this.serverBaseUrl + 'deleteFile', { "filePath": fileurl }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            return resp;
        }));
    };
    ;
    CmsService.prototype.sendMessage = function (transportMsg) {
        this.updateIBOsNavigationSubject.next(transportMsg);
    };
    CmsService.prototype.clearMessages = function () {
        this.subject.next();
    };
    CmsService.prototype.getMessage = function () {
        return this.updateIBOsNavigationSubject.asObservable();
    };
    // Reset CMS Pswd
    CmsService.prototype.resetPswd = function (login) {
        return this.http.post(this.loginUrl + '/resetpswd', login).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            console.log('== SUccess reset ===', resp);
            return resp;
        }));
    };
    ;
    CmsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _jwt_service__WEBPACK_IMPORTED_MODULE_6__["JwtService"]])
    ], CmsService);
    return CmsService;
}());



/***/ }),

/***/ "./src/app/file-upload/file-upload.component.css":
/*!*******************************************************!*\
  !*** ./src/app/file-upload/file-upload.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/file-upload/file-upload.component.html":
/*!********************************************************!*\
  !*** ./src/app/file-upload/file-upload.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<input id=\"cin\" name=\"cin\" type=\"file\" (change)=\"fileChangeEvent($event)\" placeholder=\"Upload a file...\" multiple/>\n<button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"upload()\">\n    <i class=\"glyphicon glyphicon-open-file\"></i>&nbsp;Upload\n</button>\n    <mat-nav-list>\n        <mat-list-item *ngFor=\"let link of playlist\">\n                <h1 matLine> {{link.position}} </h1>\n            <h1 matLine> {{link.value}} </h1>\n           <button mat-icon-button (click)='deleteFile(link)'>\n              <mat-icon>delete</mat-icon>\n           </button>\n        </mat-list-item>\n      </mat-nav-list>"

/***/ }),

/***/ "./src/app/file-upload/file-upload.component.ts":
/*!******************************************************!*\
  !*** ./src/app/file-upload/file-upload.component.ts ***!
  \******************************************************/
/*! exports provided: FileUploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUploadComponent", function() { return FileUploadComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _cms_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cms.service */ "./src/app/cms.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _fileUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fileUpload */ "./src/app/file-upload/fileUpload.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);







var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(http, cmsService) {
        var _this = this;
        this.http = http;
        this.cmsService = cmsService;
        this.messageEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.filesToUpload = [];
        this.uploadUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].uploadUrl;
        this.serverBaseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].serverBaseUrl;
        this.playlist = [];
        this.messages = [];
        // subscribe to home component messages
        this.subscription = this.cmsService.getMessage().subscribe(function (message) {
            if (message) {
                _this.messages.push(message);
                _this.playlist = _this.messages[0].video;
            }
            else {
                // clear messages when empty message received
                _this.messages = [];
            }
        });
    }
    FileUploadComponent.prototype.ngOnInit = function () { };
    FileUploadComponent.prototype.upload = function () {
        var _this = this;
        var formData = new FormData();
        var files = this.filesToUpload;
        for (var i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i]["name"]);
        }
        this.cmsService.upload(formData).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.success) {
                for (var i = 0; i < result.files.length; i++) {
                    _this.fileupload = new _fileUpload__WEBPACK_IMPORTED_MODULE_5__["FileUpload"]();
                    console.log('-- position ---', String(i + 1), ' file data', result.files[i]);
                    _this.fileupload.position = String(i + 1);
                    _this.fileupload.mimetype = result.files[i].mimetype;
                    _this.fileupload.key = result.files[i].path;
                    _this.fileupload.value = result.files[i].originalname;
                    _this.playlist.push(_this.fileupload);
                }
                console.log(' === File1 ===', _this.playlist);
                _this.messageEvent.emit(_this.playlist);
            }
            else {
            }
        });
    };
    FileUploadComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
    };
    FileUploadComponent.prototype.deleteFile = function (tempfile) {
        var _this = this;
        this.cmsService.deleteSingleFile(tempfile.key).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.success) {
                lodash__WEBPACK_IMPORTED_MODULE_6__["pull"](_this.playlist, tempfile);
            }
        });
    };
    FileUploadComponent.prototype.receiveMessage = function ($event) {
        this.playlist = $event;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FileUploadComponent.prototype, "messageEvent", void 0);
    FileUploadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-file-upload",
            template: __webpack_require__(/*! ./file-upload.component.html */ "./src/app/file-upload/file-upload.component.html"),
            styles: [__webpack_require__(/*! ./file-upload.component.css */ "./src/app/file-upload/file-upload.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], _cms_service__WEBPACK_IMPORTED_MODULE_2__["CmsService"]])
    ], FileUploadComponent);
    return FileUploadComponent;
}());



/***/ }),

/***/ "./src/app/file-upload/fileUpload.ts":
/*!*******************************************!*\
  !*** ./src/app/file-upload/fileUpload.ts ***!
  \*******************************************/
/*! exports provided: FileUpload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUpload", function() { return FileUpload; });
var FileUpload = /** @class */ (function () {
    function FileUpload() {
    }
    return FileUpload;
}());



/***/ }),

/***/ "./src/app/jwt.service.ts":
/*!********************************!*\
  !*** ./src/app/jwt.service.ts ***!
  \********************************/
/*! exports provided: JwtService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtService", function() { return JwtService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var JwtService = /** @class */ (function () {
    function JwtService(http) {
        this.http = http;
        this.companyId = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].companyId;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl;
        this.loginUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].loginUrl;
    }
    //Login 
    JwtService.prototype.loginCMS = function (login) {
        return this.http.post(this.loginUrl + '/login', login).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (resp) {
            var result = JSON.parse(JSON.stringify(resp));
            localStorage.setItem('access_token', result.token);
            return resp;
        }));
    };
    ;
    //LogOut
    JwtService.prototype.logout = function () {
        localStorage.removeItem('access_token');
    };
    Object.defineProperty(JwtService.prototype, "loggedIn", {
        get: function () {
            console.log('=== loggedIn ===', localStorage.getItem('access_token') !== null);
            return localStorage.getItem('access_token') !== null;
        },
        enumerable: true,
        configurable: true
    });
    JwtService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], JwtService);
    return JwtService;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-main{\n\n\n    margin-top: 10%;\n    \n    \n    }\n    \n    \n    mat-card{\n    \n    \n    min-width: 40%;\n    \n    \n    }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0lBR0ksZUFBZTs7O0lBR2Y7OztJQUdBOzs7SUFHQSxjQUFjOzs7SUFHZCIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9naW4tbWFpbntcblxuXG4gICAgbWFyZ2luLXRvcDogMTAlO1xuICAgIFxuICAgIFxuICAgIH1cbiAgICBcbiAgICBcbiAgICBtYXQtY2FyZHtcbiAgICBcbiAgICBcbiAgICBtaW4td2lkdGg6IDQwJTtcbiAgICBcbiAgICBcbiAgICB9Il19 */"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"login-main\">\n  <mat-card >\n  <mat-card-header>\n     <mat-card-title>Login Page</mat-card-title>\n  </mat-card-header>\n  <mat-card-content fxLayout=\"column\">\n     <mat-form-field>\n       <input matInput placeholder=\"Email\" [(ngModel)]=\"login.emailId\"  >\n     </mat-form-field>\n     <mat-form-field>\n       <input type=\"password\"  matInput placeholder=\"password\" [(ngModel)]=\"login.password\" >\n     </mat-form-field>\n  </mat-card-content>\n  <mat-card-actions align=\"end\">\n     <button mat-raised-button color=\"primary\" (click)=\"onclick()\" >Login</button>\n     <button mat-raised-button color=\"primary\" routerLink=\"/reset\" >Reset</button>\n  </mat-card-actions>\n  </mat-card>\n  </div>"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login */ "./src/app/login/login.ts");
/* harmony import */ var _cms_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cms.service */ "./src/app/cms.service.ts");
/* harmony import */ var _jwt_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jwt.service */ "./src/app/jwt.service.ts");






//import { CATEGORY} from './mock-catego
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, cmsService, jwtService) {
        this.router = router;
        this.cmsService = cmsService;
        this.jwtService = jwtService;
        this.login = new _login__WEBPACK_IMPORTED_MODULE_3__["Login"]();
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onclick = function () {
        var _this = this;
        this.login['type'] = 'B2E';
        console.log(' login clicked', this.login);
        this.jwtService.loginCMS(this.login).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.router.navigate(['/category']);
            }
            else {
                // Invalid Credentials
            }
        });
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            providers: [_cms_service__WEBPACK_IMPORTED_MODULE_4__["CmsService"], _jwt_service__WEBPACK_IMPORTED_MODULE_5__["JwtService"]],
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _cms_service__WEBPACK_IMPORTED_MODULE_4__["CmsService"], _jwt_service__WEBPACK_IMPORTED_MODULE_5__["JwtService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.ts":
/*!********************************!*\
  !*** ./src/app/login/login.ts ***!
  \********************************/
/*! exports provided: Login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
var Login = /** @class */ (function () {
    function Login() {
    }
    return Login;
}());



/***/ }),

/***/ "./src/app/meida/media.ts":
/*!********************************!*\
  !*** ./src/app/meida/media.ts ***!
  \********************************/
/*! exports provided: Media */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Media", function() { return Media; });
/* harmony import */ var _file_upload_fileUpload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../file-upload/fileUpload */ "./src/app/file-upload/fileUpload.ts");

var Media = /** @class */ (function () {
    function Media() {
        this.videoUrl = [];
        this.thumbImageUrl = new _file_upload_fileUpload__WEBPACK_IMPORTED_MODULE_0__["FileUpload"]();
    }
    return Media;
}());



/***/ }),

/***/ "./src/app/meida/meida.component.css":
/*!*******************************************!*\
  !*** ./src/app/meida/meida.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVpZGEvbWVpZGEuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7RUFDYiIsImZpbGUiOiJzcmMvYXBwL21laWRhL21laWRhLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/meida/meida.component.html":
/*!********************************************!*\
  !*** ./src/app/meida/meida.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-menu></app-menu>\n\n<div>\n  <mat-card>\n    <mat-card-header fxLayoutAlign=\"center\">\n      <mat-card-title>Media</mat-card-title>\n    </mat-card-header>\n    <div *ngIf=\"selectedMedia.enableUpdate; else save\">\n      <!-- Update UI-->\n      <mat-card-content fxLayout=\"column\" fxLayoutAlign=\"center\">\n\n        <mat-form-field>\n          <mat-label>Select Category</mat-label>\n          <mat-select [(ngModel)]=\"selectedMedia.categoryId\" (selectionChange)=\"updatecategoryClick ()\" \n            multiple>\n            <mat-option *ngFor=\"let food of category\" [value]=\"food.categoryId\">\n              {{food.categoryName}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n        <mat-form-field>\n          <mat-label>Select Sub Category</mat-label>\n          <mat-select [(ngModel)]=\"selectedMedia.subCategoryId\"  multiple>\n            <mat-option *ngFor=\"let food of subCategory\" [value]=\"food.subCategoryId\">\n              {{food.subCategoryName}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n        <mat-form-field>\n          <input matInput placeholder=\"Name\" [(ngModel)]=\"selectedMedia.title\">\n        </mat-form-field>\n        <mat-form-field>\n          <textarea matInput placeholder=\"Description\" [(ngModel)]=\"selectedMedia.description\"></textarea>\n        </mat-form-field>\n        <mat-form-field>\n          <textarea matInput placeholder=\"Description\" [(ngModel)]=\"selectedMedia.description\"></textarea>\n        </mat-form-field>\n\n        <mat-form-field>\n          <input matInput placeholder=\"Narrator\" [(ngModel)]=\"selectedMedia.narrator\">\n        </mat-form-field>\n        <mat-form-field>\n          <textarea matInput placeholder=\"Author\" [(ngModel)]=\"selectedMedia.author\"></textarea>\n        </mat-form-field>\n\n        <mat-slide-toggle [(ngModel)]=\"selectedMedia.premium\"> Premium Video</mat-slide-toggle>\n      </mat-card-content>\n        <input placeholder=\"Multiple Audio/Video\">\n        <app-file-upload (messageEvent)=\"receiveUpdateVideoMessage($event)\"></app-file-upload>\n        <br>\n        <br>\n        <input placeholder=\"Single Thumbnail Image \">\n        <app-single-file-upload (messageEvent)=\"receiveUpdateSingleFile($event)\"></app-single-file-upload>\n        <span></span>\n\n        <mat-slide-toggle [(ngModel)]=\"selectedMedia.active\"> Active</mat-slide-toggle>\n     \n        \n      <mat-card-actions align=\"center\">\n        <button mat-raised-button color=\"primary\" (click)=\"onUpdate()\">Update</button>\n        <button mat-raised-button color=\"primary\" (click)=\"onClear()\" >Clear</button>\n      </mat-card-actions>\n    </div>\n    <ng-template #save>\n      <!--SAVE UI-->\n      <mat-card-content fxLayout=\"column\" fxLayoutAlign=\"center\">\n\n        <mat-form-field>\n          <mat-label>Select Category</mat-label>\n          <mat-select [(ngModel)]=\"media.categoryId\" (selectionChange)=\"categoryClick()\" \n            multiple>\n            <mat-option *ngFor=\"let food of category\" [value]=\"food.categoryId\">\n              {{food.categoryName}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n        <mat-form-field>\n          <mat-label>Select Sub Category</mat-label>\n          <mat-select [(ngModel)]=\"media.subCategoryId\"  multiple>\n            <mat-option *ngFor=\"let food of subCategory\" [value]=\"food.subCategoryId\">\n              {{food.subCategoryName}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n\n        <mat-form-field>\n          <input matInput placeholder=\"Name\" [(ngModel)]=\"media.title\">\n        </mat-form-field>\n        <mat-form-field>\n          <textarea matInput placeholder=\"Description\" [(ngModel)]=\"media.description\"></textarea>\n        </mat-form-field>\n\n        <mat-form-field>\n          <input matInput placeholder=\"Narrator\" [(ngModel)]=\"media.narrator\">\n        </mat-form-field>\n        <mat-form-field>\n          <textarea matInput placeholder=\"Author\" [(ngModel)]=\"media.author\"></textarea>\n        </mat-form-field>\n\n        <mat-slide-toggle [(ngModel)]=\"media.premium\"> Premium Video</mat-slide-toggle>\n\n      </mat-card-content>\n      <input placeholder=\"Audio/Video\">\n      <app-file-upload (messageEvent)=\"receiveMessage($event)\"></app-file-upload>\n      <br>\n      <br>\n      <input placeholder=\"ThumbNail Image \">\n      <app-single-file-upload (messageEvent)=\"receiveSingleFile($event)\"></app-single-file-upload>\n      <span></span>\n\n      <mat-slide-toggle [(ngModel)]=\"media.active\"> Slide me!</mat-slide-toggle>\n\n      <mat-card-actions align=\"center\">\n        <button mat-raised-button color=\"primary\" (click)=\"onSave()\">Save</button>\n      </mat-card-actions>\n    </ng-template>\n\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n\n      <!-- Name Column -->\n      <ng-container matColumnDef=\"name\">\n        <th mat-header-cell *matHeaderCellDef> Name </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.title}} </td>\n      </ng-container>\n\n      <!-- Weight Column -->\n      <ng-container matColumnDef=\"active\">\n        <th mat-header-cell *matHeaderCellDef> Active </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.active}} </td>\n      </ng-container>\n\n      <!-- Symbol Column -->\n      <ng-container matColumnDef=\"create_date\">\n        <th mat-header-cell *matHeaderCellDef> Inserted Date </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.create_date}} </td>\n      </ng-container>\n      <ng-container matColumnDef=\"updateAction\">\n        <th mat-header-cell *matHeaderCellDef> Update </th>\n        <td mat-cell *matCellDef=\"let element\"><i class=\"material-icons\" (click)=\"edit(element)\">edit</i>\n      </ng-container>\n      <ng-container matColumnDef=\"deleteAction\">\n        <th mat-header-cell *matHeaderCellDef> Delete </th>\n        <td mat-cell *matCellDef=\"let element\"><i class=\"material-icons\" (click)=\"delete(element)\">delete</i>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n    <!-- <mat-paginator [pageSizeOptions]=\"[1, 10, 20]\" showFirstLastButtons></mat-paginator> -->\n\n  </mat-card>\n</div>"

/***/ }),

/***/ "./src/app/meida/meida.component.ts":
/*!******************************************!*\
  !*** ./src/app/meida/meida.component.ts ***!
  \******************************************/
/*! exports provided: MeidaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeidaComponent", function() { return MeidaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _cms_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cms.service */ "./src/app/cms.service.ts");
/* harmony import */ var _media__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./media */ "./src/app/meida/media.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _transporter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transporter */ "./src/app/meida/transporter.ts");






var MeidaComponent = /** @class */ (function () {
    function MeidaComponent(cmsService) {
        this.cmsService = cmsService;
        this.media = new _media__WEBPACK_IMPORTED_MODULE_3__["Media"]();
        this.toppings = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]();
        this.selectedMedia = new _media__WEBPACK_IMPORTED_MODULE_3__["Media"]();
        this.filesToUpload = [];
        this.parentEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.messageEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.transportMsg = new _transporter__WEBPACK_IMPORTED_MODULE_5__["Transporter"]();
    }
    MeidaComponent.prototype.ngOnInit = function () {
        this.media.active = true;
        this.media.videoUrl;
        this.loadMedia();
        this.loadCategories();
    };
    MeidaComponent.prototype.loadMedia = function () {
        var _this = this;
        this.cmsService.getAllMedia().subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            _this.dataSource = result.message;
            _this.displayedColumns = ['name', 'active', 'create_date', 'deleteAction', 'updateAction'];
        });
    };
    MeidaComponent.prototype.onSave = function () {
        var _this = this;
        this.media['type'] = "SAVE";
        this.cmsService.saveOrupdateMedia(this.media).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.loadMedia();
                _this.onClear();
            }
            else {
            }
        });
    };
    MeidaComponent.prototype.loadCategories = function () {
        var _this = this;
        this.cmsService.getCategories().subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            _this.category = result.message;
        });
    };
    MeidaComponent.prototype.onUpdate = function () {
        var _this = this;
        this.selectedMedia['type'] = "SAVE";
        this.cmsService.saveOrupdateMedia(this.selectedMedia).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.loadMedia();
                _this.onClear();
            }
            else {
            }
        });
    };
    MeidaComponent.prototype.edit = function (row) {
        var _this = this;
        this.onClear();
        this.selectedMedia = row;
        this.selectedMedia.enableUpdate = true;
        this.transportMsg.img = this.selectedMedia.thumbImageUrl;
        this.transportMsg.video = this.selectedMedia.videoUrl;
        this.cmsService.sendMessage(this.transportMsg);
        this.cmsService.getSubCategories(this.selectedMedia).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            _this.subCategory = result.message;
            _this.selectedMedia.enableUpdate = true;
            console.log('--- Sub Category ---', _this.subCategory, 'category ', _this.selectedMedia.categoryId, 'sub cat id', _this.selectedMedia.subCategoryId);
        });
    };
    MeidaComponent.prototype.delete = function (row) {
        var _this = this;
        // your delete code
        this.deletedMedia = row;
        this.deletedMedia['type'] = "DELETE";
        this.cmsService.deleteMedia(this.deletedMedia).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.loadMedia();
                _this.onClear();
            }
            else {
            }
        });
    };
    MeidaComponent.prototype.categoryClick = function () {
        var _this = this;
        this.cmsService.getSubCategories(this.media).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            _this.subCategory = result.message;
        });
    };
    MeidaComponent.prototype.updatecategoryClick = function () {
        var _this = this;
        this.cmsService.getSubCategories(this.selectedMedia).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            _this.subCategory = result.message;
        });
    };
    MeidaComponent.prototype.loadSubCategories = function () {
        var _this = this;
        this.cmsService.getAllSubCategories().subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            _this.subCategory = result.message;
        });
    };
    MeidaComponent.prototype.receiveMessage = function ($event) {
        this.media.videoUrl = $event;
    };
    MeidaComponent.prototype.receiveSingleFile = function ($event) {
        this.media.thumbImageUrl = $event;
    };
    MeidaComponent.prototype.receiveUpdateVideoMessage = function ($event) {
        this.selectedMedia.videoUrl = $event;
    };
    MeidaComponent.prototype.receiveUpdateSingleFile = function ($event) {
        this.selectedMedia.thumbImageUrl = $event;
    };
    MeidaComponent.prototype.onClear = function () {
        this.selectedMedia = new _media__WEBPACK_IMPORTED_MODULE_3__["Media"]();
        this.media = new _media__WEBPACK_IMPORTED_MODULE_3__["Media"]();
        this.transportMsg.img = this.selectedMedia.thumbImageUrl;
        this.transportMsg.video = this.selectedMedia.videoUrl;
        this.cmsService.sendMessage(this.transportMsg);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], MeidaComponent.prototype, "parentEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], MeidaComponent.prototype, "messageEvent", void 0);
    MeidaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "[app-meida],[app-single-file-upload]",
            template: __webpack_require__(/*! ./meida.component.html */ "./src/app/meida/meida.component.html"),
            providers: [_cms_service__WEBPACK_IMPORTED_MODULE_2__["CmsService"]],
            styles: [__webpack_require__(/*! ./meida.component.css */ "./src/app/meida/meida.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_cms_service__WEBPACK_IMPORTED_MODULE_2__["CmsService"]])
    ], MeidaComponent);
    return MeidaComponent;
}());



/***/ }),

/***/ "./src/app/meida/transporter.ts":
/*!**************************************!*\
  !*** ./src/app/meida/transporter.ts ***!
  \**************************************/
/*! exports provided: Transporter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transporter", function() { return Transporter; });
var Transporter = /** @class */ (function () {
    function Transporter() {
    }
    return Transporter;
}());



/***/ }),

/***/ "./src/app/menu/menu.component.css":
/*!*****************************************!*\
  !*** ./src/app/menu/menu.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lbnUvbWVudS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/menu/menu.component.html":
/*!******************************************!*\
  !*** ./src/app/menu/menu.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <mat-toolbar color=\"primary\">\n  <mat-toolbar-row>\n    <a routerLink=\"/category\" mat-menu-item> Category </a>\n    <span class=\"example-item\"></span>\n    <a routerLink=\"/subcategory\" mat-menu-item> Sub Category </a>\n    <a routerLink=\"/media\" mat-menu-item> Media </a>\n    <span class=\"example-spacer\"></span>\n    <mat-icon class=\"example-icon\" aria-hidden=\"false\" (click)=\"onLogout()\" aria-label=\"Example heart icon\">favorite</mat-icon>\n  </mat-toolbar-row>\n</mat-toolbar> -->\n<button mat-icon-button [matMenuTriggerFor]=\"menu\">\n    <mat-icon>more_vert</mat-icon>\n  </button>\n  <mat-menu #menu=\"matMenu\">\n    <button mat-menu-item routerLink=\"/category\">\n      <mat-icon>album</mat-icon>\n      <span>Category</span>\n    </button>\n    <button mat-menu-item routerLink=\"/subcategory\">\n      <mat-icon>art_track</mat-icon>\n      <span>SubCategory</span>\n    </button>\n    <button mat-menu-item routerLink=\"/media\">\n      <mat-icon>theaters</mat-icon>\n      <span>Media</span>\n    </button>\n    <button mat-menu-item (click)=\"onLogout()\">\n        <mat-icon>exit_to_app</mat-icon>\n        <span>Logout</span>\n      </button>\n  </mat-menu>"

/***/ }),

/***/ "./src/app/menu/menu.component.ts":
/*!****************************************!*\
  !*** ./src/app/menu/menu.component.ts ***!
  \****************************************/
/*! exports provided: MenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuComponent", function() { return MenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _jwt_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jwt.service */ "./src/app/jwt.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var MenuComponent = /** @class */ (function () {
    function MenuComponent(jwtService, router) {
        this.jwtService = jwtService;
        this.router = router;
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    MenuComponent.prototype.onLogout = function () {
        this.jwtService.logout();
        console.log('=== Logout Clicked ===', this.jwtService.loggedIn);
        if (!this.jwtService.loggedIn) {
            this.router.navigate(['/login']);
        }
        else {
            // Invalid Credentials
        }
    };
    MenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-menu',
            template: __webpack_require__(/*! ./menu.component.html */ "./src/app/menu/menu.component.html"),
            styles: [__webpack_require__(/*! ./menu.component.css */ "./src/app/menu/menu.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_jwt_service__WEBPACK_IMPORTED_MODULE_2__["JwtService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "./src/app/reset-pswd/reset-pswd.component.css":
/*!*****************************************************!*\
  !*** ./src/app/reset-pswd/reset-pswd.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-main{\n\n\n    margin-top: 10%;\n    \n    \n    }\n    \n    \n    mat-card{\n    \n    \n    min-width: 40%;\n    \n    \n    }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVzZXQtcHN3ZC9yZXNldC1wc3dkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztJQUdJLGVBQWU7OztJQUdmOzs7SUFHQTs7O0lBR0EsY0FBYzs7O0lBR2QiLCJmaWxlIjoic3JjL2FwcC9yZXNldC1wc3dkL3Jlc2V0LXBzd2QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dpbi1tYWlue1xuXG5cbiAgICBtYXJnaW4tdG9wOiAxMCU7XG4gICAgXG4gICAgXG4gICAgfVxuICAgIFxuICAgIFxuICAgIG1hdC1jYXJke1xuICAgIFxuICAgIFxuICAgIG1pbi13aWR0aDogNDAlO1xuICAgIFxuICAgIFxuICAgIH0iXX0= */"

/***/ }),

/***/ "./src/app/reset-pswd/reset-pswd.component.html":
/*!******************************************************!*\
  !*** ./src/app/reset-pswd/reset-pswd.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"login-main\">\n  <mat-card >\n  <mat-card-header>\n     <mat-card-title>Reset Page</mat-card-title>\n  </mat-card-header>\n  <mat-card-content fxLayout=\"column\">\n     <mat-form-field>\n       <input matInput placeholder=\"Email\" [(ngModel)]=\"login.emailId\"  >\n     </mat-form-field>\n     <mat-form-field>\n       <input type=\"password\"  matInput placeholder=\"password\" [(ngModel)]=\"login.password\" >\n     </mat-form-field>\n  </mat-card-content>\n  <mat-card-actions align=\"end\">\n     <button mat-raised-button color=\"primary\" (click)=\"onReset(login)\" >Reset</button>\n     <button mat-raised-button color=\"primary\" routerLink=\"/login\" >Cancel</button>\n  </mat-card-actions>\n  </mat-card>\n  </div>"

/***/ }),

/***/ "./src/app/reset-pswd/reset-pswd.component.ts":
/*!****************************************************!*\
  !*** ./src/app/reset-pswd/reset-pswd.component.ts ***!
  \****************************************************/
/*! exports provided: ResetPswdComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPswdComponent", function() { return ResetPswdComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../login/login */ "./src/app/login/login.ts");
/* harmony import */ var _cms_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cms.service */ "./src/app/cms.service.ts");





var ResetPswdComponent = /** @class */ (function () {
    function ResetPswdComponent(router, cmsService) {
        this.router = router;
        this.cmsService = cmsService;
        this.login = new _login_login__WEBPACK_IMPORTED_MODULE_3__["Login"]();
    }
    ResetPswdComponent.prototype.ngOnInit = function () {
    };
    ResetPswdComponent.prototype.onReset = function (resetData) {
        var _this = this;
        resetData['type'] = 'B2E';
        console.log(' Reset clicked', resetData);
        this.cmsService.resetPswd(resetData).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.router.navigate(['/login']);
            }
            else {
                // Invalid Credentials
            }
        });
    };
    ResetPswdComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reset-pswd',
            template: __webpack_require__(/*! ./reset-pswd.component.html */ "./src/app/reset-pswd/reset-pswd.component.html"),
            styles: [__webpack_require__(/*! ./reset-pswd.component.css */ "./src/app/reset-pswd/reset-pswd.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _cms_service__WEBPACK_IMPORTED_MODULE_4__["CmsService"]])
    ], ResetPswdComponent);
    return ResetPswdComponent;
}());



/***/ }),

/***/ "./src/app/single-file-upload/single-file-upload.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/single-file-upload/single-file-upload.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NpbmdsZS1maWxlLXVwbG9hZC9zaW5nbGUtZmlsZS11cGxvYWQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/single-file-upload/single-file-upload.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/single-file-upload/single-file-upload.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<input id=\"cin\" name=\"cin\" type=\"file\" (change)=\"fileChangeEvent($event)\" placeholder=\"Upload a file...\" />\n<button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"upload()\">\n    <i class=\"glyphicon glyphicon-open-file\"></i>&nbsp;Upload\n</button>\n\n<mat-nav-list >\n    <mat-list-item>\n        <h3 matLine> {{imgUrl.value}} </h3>\n        <button mat-icon-button (click)='onSigleDelete(imgUrl)'>\n            <mat-icon>delete</mat-icon>\n        </button>\n    </mat-list-item>\n</mat-nav-list>\n"

/***/ }),

/***/ "./src/app/single-file-upload/single-file-upload.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/single-file-upload/single-file-upload.component.ts ***!
  \********************************************************************/
/*! exports provided: SingleFileUploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleFileUploadComponent", function() { return SingleFileUploadComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _cms_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cms.service */ "./src/app/cms.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _file_upload_fileUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../file-upload/fileUpload */ "./src/app/file-upload/fileUpload.ts");






var SingleFileUploadComponent = /** @class */ (function () {
    function SingleFileUploadComponent(http, cmsService, ref) {
        var _this = this;
        this.http = http;
        this.cmsService = cmsService;
        this.ref = ref;
        this.messages = [];
        this.messageEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.filesToUpload = [];
        this.fileNames = [];
        this.uploadUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].singleUploadUrl;
        this.serverBaseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].serverBaseUrl;
        this.imgUrl = new _file_upload_fileUpload__WEBPACK_IMPORTED_MODULE_5__["FileUpload"];
        // subscribe to home component messages
        this.subscription = this.cmsService.getMessage().subscribe(function (message) {
            if (message) {
                _this.messages.push(message);
                _this.imgUrl = _this.messages[0].img;
            }
            else {
                // clear messages when empty message received
                _this.messages = [];
            }
        });
    }
    SingleFileUploadComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    };
    SingleFileUploadComponent.prototype.ngOnInit = function () { };
    SingleFileUploadComponent.prototype.upload = function () {
        var _this = this;
        var formData = new FormData();
        var files = this.filesToUpload;
        for (var i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i]["name"]);
        }
        this.cmsService.singleFileupload(formData).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.success) {
                _this.imgUrl = new _file_upload_fileUpload__WEBPACK_IMPORTED_MODULE_5__["FileUpload"]();
                _this.imgUrl.key = result.files[0].path;
                _this.imgUrl.value = result.files[0].originalname;
                _this.messageEvent.emit(_this.imgUrl);
            }
            else {
            }
        });
    };
    SingleFileUploadComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
    };
    SingleFileUploadComponent.prototype.onSigleDelete = function (tempfile) {
        var _this = this;
        this.cmsService.deleteSingleFile(tempfile.key).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.success) {
                _this.imgUrl = new _file_upload_fileUpload__WEBPACK_IMPORTED_MODULE_5__["FileUpload"];
            }
        });
    };
    SingleFileUploadComponent.prototype.receiveMessage = function ($event) {
        this.imgUrl = $event;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SingleFileUploadComponent.prototype, "messageEvent", void 0);
    SingleFileUploadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-single-file-upload',
            template: __webpack_require__(/*! ./single-file-upload.component.html */ "./src/app/single-file-upload/single-file-upload.component.html"),
            styles: [__webpack_require__(/*! ./single-file-upload.component.css */ "./src/app/single-file-upload/single-file-upload.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], _cms_service__WEBPACK_IMPORTED_MODULE_2__["CmsService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], SingleFileUploadComponent);
    return SingleFileUploadComponent;
}());



/***/ }),

/***/ "./src/app/subcategory/subcategory.component.css":
/*!*******************************************************!*\
  !*** ./src/app/subcategory/subcategory.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3ViY2F0ZWdvcnkvc3ViY2F0ZWdvcnkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7RUFDYiIsImZpbGUiOiJzcmMvYXBwL3N1YmNhdGVnb3J5L3N1YmNhdGVnb3J5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/subcategory/subcategory.component.html":
/*!********************************************************!*\
  !*** ./src/app/subcategory/subcategory.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-menu></app-menu>\n\n<div >\n  <mat-card >\n  <mat-card-header fxLayoutAlign=\"center\">\n     <mat-card-title>Sub Category</mat-card-title>\n  </mat-card-header>\n  <div *ngIf=\"selectedSubCategory.enableUpdate; else save\">\n    <!-- Update UI-->\n    <mat-card-content fxLayout=\"column\" fxLayoutAlign=\"center\">\n        <mat-form-field>\n            <mat-label>Select Category</mat-label>\n            <mat-select [(ngModel)]=\"selectedSubCategory.categoryId\"   [formControl]=\"toppings\" multiple>\n              <mat-option *ngFor=\"let food of category\" [value]=\"food.categoryId\">\n                {{food.categoryName}}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n        <mat-form-field>\n          <input matInput placeholder=\"Name\" [(ngModel)]=\"selectedSubCategory.subCategoryName\"  >\n        </mat-form-field>\n        <mat-form-field>\n          <textarea matInput placeholder=\"Description\" [(ngModel)]=\"selectedSubCategory.description\" ></textarea>\n        </mat-form-field>\n         <mat-slide-toggle [(ngModel)]=\"selectedSubCategory.active\"> Slide me!</mat-slide-toggle>\n     </mat-card-content>\n     <mat-card-actions align=\"center\">\n        <button mat-raised-button color=\"primary\" (click)=\"onUpdate()\" >Update</button>\n        <button mat-raised-button color=\"primary\" (click)=\"onClear()\" >Clear</button>\n     </mat-card-actions>\n  </div>\n  <ng-template #save>\n\n    <!--SAVE UI-->\n  <mat-card-content fxLayout=\"column\" fxLayoutAlign=\"center\">\n\n      <mat-form-field>\n          <mat-label>Select Category</mat-label>\n          <mat-select [(ngModel)]=\"subCategory.categoryId\" [formControl]=\"toppings\" multiple>\n            <mat-option *ngFor=\"let food of category\" [value]=\"food.categoryId\">\n              {{food.categoryName}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n        \n     <mat-form-field >\n       <input matInput placeholder=\"Name\" [(ngModel)]=\"subCategory.subCategoryName\"  >\n     </mat-form-field>\n      \n     \n     <mat-form-field>\n     <textarea matInput placeholder=\"Description\" [(ngModel)]=\"subCategory.description\" ></textarea>\n    </mat-form-field>\n      \n     \n  </mat-card-content>\n  <mat-slide-toggle [(ngModel)]=\"subCategory.active\"> Slide me!</mat-slide-toggle>\n  <mat-card-actions align=\"center\">\n     <button mat-raised-button color=\"primary\" (click)=\"onSave()\" >Save</button>\n  </mat-card-actions>\n</ng-template>\n  \n  <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"categoryName\">\n      <th mat-header-cell *matHeaderCellDef> Name </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.subCategoryName}} </td>\n    </ng-container>\n  \n    <!-- Weight Column -->\n    <ng-container matColumnDef=\"active\">\n      <th mat-header-cell *matHeaderCellDef> Active </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.active}} </td>\n    </ng-container>\n  \n    <!-- Symbol Column -->\n    <ng-container matColumnDef=\"create_date\">\n      <th mat-header-cell *matHeaderCellDef> Inserted Date </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.create_date}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"updateAction\">\n        <th mat-header-cell *matHeaderCellDef> Update </th>\n          <td mat-cell *matCellDef=\"let element\"><i class=\"material-icons\" (click)=\"edit(element)\">edit</i>\n    </ng-container>\n    <ng-container matColumnDef=\"deleteAction\">\n        <th mat-header-cell *matHeaderCellDef> Delete </th>\n          <td mat-cell *matCellDef=\"let element\"><i class=\"material-icons\" (click)=\"delete(element)\">delete</i>\n    </ng-container> \n  \n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n     <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr> \n  </table>\n\n\n  </mat-card>\n  </div>"

/***/ }),

/***/ "./src/app/subcategory/subcategory.component.ts":
/*!******************************************************!*\
  !*** ./src/app/subcategory/subcategory.component.ts ***!
  \******************************************************/
/*! exports provided: SubcategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubcategoryComponent", function() { return SubcategoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _subcategory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subcategory */ "./src/app/subcategory/subcategory.ts");
/* harmony import */ var _cms_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cms.service */ "./src/app/cms.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");





var SubcategoryComponent = /** @class */ (function () {
    function SubcategoryComponent(cmsService) {
        this.cmsService = cmsService;
        this.toppings = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]();
        this.subCategory = new _subcategory__WEBPACK_IMPORTED_MODULE_2__["SubCategory"]();
        this.selectedSubCategory = new _subcategory__WEBPACK_IMPORTED_MODULE_2__["SubCategory"]();
    }
    SubcategoryComponent.prototype.ngOnInit = function () {
        this.subCategory.active = true;
        this.loadCategories();
        this.loadSubCategories();
    };
    SubcategoryComponent.prototype.onSave = function () {
        var _this = this;
        this.subCategory['type'] = "SAVE";
        this.cmsService.saveOrupdateSubCategory(this.subCategory).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.loadSubCategories();
                _this.onClear();
            }
            else {
            }
        });
    };
    SubcategoryComponent.prototype.loadCategories = function () {
        var _this = this;
        this.cmsService.getCategories().subscribe(function (response) {
            // this.displayedColumns = ['categoryName', 'active', 'create_date','deleteAction','updateAction']; 
            var result = JSON.parse(JSON.stringify(response));
            _this.category = [];
            _this.category = result.message;
        });
    };
    SubcategoryComponent.prototype.onUpdate = function () {
        var _this = this;
        this.selectedSubCategory['type'] = "SAVE";
        this.cmsService.saveOrupdateSubCategory(this.selectedSubCategory).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.loadSubCategories();
                _this.onClear();
            }
            else {
            }
        });
    };
    SubcategoryComponent.prototype.edit = function (row) {
        this.selectedSubCategory = new _subcategory__WEBPACK_IMPORTED_MODULE_2__["SubCategory"]();
        this.selectedSubCategory = row;
        this.selectedSubCategory.enableUpdate = true;
        console.log('--- sel sub category ---', this.selectedSubCategory);
        this.loadCategories();
    };
    SubcategoryComponent.prototype.delete = function (row) {
        // your delete code
        var _this = this;
        this.deletedSubCategory = row;
        this.deletedSubCategory['type'] = "DELETE";
        this.cmsService.deleteSubCategory(this.deletedSubCategory).subscribe(function (response) {
            var result = JSON.parse(JSON.stringify(response));
            if (result.status == 'SUCCESS') {
                _this.loadSubCategories();
                _this.onClear();
            }
            else {
            }
        });
    };
    SubcategoryComponent.prototype.loadSubCategories = function () {
        var _this = this;
        this.cmsService.getAllSubCategories().subscribe(function (response) {
            _this.displayedColumns = ['categoryName', 'active', 'create_date', 'deleteAction', 'updateAction'];
            var result = JSON.parse(JSON.stringify(response));
            _this.dataSource = result.message;
        });
    };
    SubcategoryComponent.prototype.onClear = function () {
        this.selectedSubCategory = new _subcategory__WEBPACK_IMPORTED_MODULE_2__["SubCategory"]();
        this.subCategory = new _subcategory__WEBPACK_IMPORTED_MODULE_2__["SubCategory"]();
    };
    SubcategoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-subcategory',
            template: __webpack_require__(/*! ./subcategory.component.html */ "./src/app/subcategory/subcategory.component.html"),
            providers: [_cms_service__WEBPACK_IMPORTED_MODULE_3__["CmsService"]],
            styles: [__webpack_require__(/*! ./subcategory.component.css */ "./src/app/subcategory/subcategory.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_cms_service__WEBPACK_IMPORTED_MODULE_3__["CmsService"]])
    ], SubcategoryComponent);
    return SubcategoryComponent;
}());



/***/ }),

/***/ "./src/app/subcategory/subcategory.ts":
/*!********************************************!*\
  !*** ./src/app/subcategory/subcategory.ts ***!
  \********************************************/
/*! exports provided: SubCategory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubCategory", function() { return SubCategory; });
var SubCategory = /** @class */ (function () {
    function SubCategory() {
    }
    return SubCategory;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    baseUrl: "/cms",
    loginUrl: "/auth",
    uploadUrl: "/upload",
    singleUploadUrl: "/singleUpload",
    serverBaseUrl: "http://localhost:8080/",
    companyId: "10000"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/AHMED/Desktop/Ahmed/Production/muzmin-backend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map