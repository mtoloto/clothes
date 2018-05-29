import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';

/*
  Generated class for the PhoneloginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhoneLoginProvider extends BaseProvider {

  constructor(public http: HttpClient) {
    super();
  }

  postPhone(phone: string) {
    return this.http.post(this.apiUrl + "/customer/phoneauth/postphone", { phone: phone });
  }

  verifyCode(code: string){
    return this.http.post(this.apiUrl + "/customer/phoneauth/verifyCode", { code: code });
  }
}
