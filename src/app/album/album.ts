import { FileUpload } from '../file-upload/fileUpload';
export class Album {
  albumId: String;
  active: boolean;
  categoryId: [String];
  videoUrl: FileUpload[] = [];
  companyId: String;
  title: String;
  description: String;
  thumbImageUrl: [{}];
  authorImageUrl: String;
  mediaType: String;
  narrator: String;
  author: String;
  createdBy: String;
  modifiedBy: String;
  create_date: String;
  modify_date: String;
  enableUpdate: boolean;
  duration: String;
  sequence: Number;
}