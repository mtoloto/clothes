import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BaseProvider {

  public apiUrl = 'http://localhost:6254/api';
  
  constructor() {

  }

}
