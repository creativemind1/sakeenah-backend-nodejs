import { EpisodeWise } from './episodewise';
import { FileUpload } from '../file-upload/fileUpload';

export class PlayList {
  [x: string]: any;
  plaaudioIDyListId: string;
  albumId: string
  name: string;
  premium: boolean;
  create_date: string;
  description: string;
  createdBy: string;
  authorBy: string;
  companyId: string;
  enableUpdate: boolean;
  episode:EpisodeWise;
  //episode: Number;
  thumbImageUrl: [{}];
  videoUrl: FileUpload[] = [];
  paginator: [];
  typeFile: string
}

