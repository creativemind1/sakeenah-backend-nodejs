import { DayWise} from './daywise';
import {FileUpload} from '../file-upload/fileUpload';

export class PlayList {
    playListId: string;
     mediaId:string
     name: string;
     active:boolean; 
     create_date:string;
     description:string;
     createdBy:string;
     authorBy:string;
     companyId: string;
     enableUpdate:boolean;
     selectDay:DayWise;
     thumbImageUrl: FileUpload= new FileUpload();
     videoUrl: FileUpload[]=[];
     
   }
   
   