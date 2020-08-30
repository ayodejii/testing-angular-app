import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from 'app/common/data.service';

@Injectable()
export class PostService extends DataService {

  //url: string = ';

  constructor(http: Http) { 
    super('http://localhost:3000/posts', http);
  }
}
