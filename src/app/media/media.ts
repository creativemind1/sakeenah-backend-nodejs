import {FileUpload} from '../file-upload/fileUpload';

export class Media {

     mediaId: String;
     active: boolean;
     categoryId: [String];
     subCategoryId: [ String ];
     videoUrl: FileUpload[]=[];
     companyId: String;
     title: String;
     description: String;
     thumbImageUrl: FileUpload= new FileUpload();
     authorImageUrl: String;
     mediaType: String;
     narrator: String;
     author: String;
     createdBy: String;
     modifiedBy: String;
     create_date: String;
     modify_date: String;
     enableUpdate:boolean;
   }
   
   