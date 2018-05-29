import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {
     
    _apiURI : string;
 
    constructor() {
        this._apiURI = 'http://192.168.0.162:5000/api';
     }
 
     getApiURI() {
         return this._apiURI;
     }    
}
 