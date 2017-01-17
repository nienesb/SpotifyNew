import {Album} from "./Album";
import {Image} from "./image";

export class Artist{
  id: number;
  name: string;
  genres: any;
  albums: Album[];
  images: Image[];
}
