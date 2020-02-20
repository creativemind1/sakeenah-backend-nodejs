import { DayWise } from './daywise';
import { FileUpload } from '../file-upload/fileUpload';

export class PlayList {
  [x: string]: any;
    plaaudioIDyListId: string;
     mediaId:string
     name: string;
     premium:boolean; 
     create_date:string;
     description:string;
     createdBy:string;
     authorBy:string;
     companyId: string;
     enableUpdate:boolean;
     //selectDay:DayWise;
     selectDay:Number;
     thumbImageUrl: [{}];
     videoUrl: FileUpload[]=[];
     paginator: [];
     typeFile: string
   }
   
   