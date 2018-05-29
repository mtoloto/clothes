import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { BaseProvider } from '../base/base';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class AuthProvider extends BaseProvider {

  private loggedIn = false;

  constructor(private http: HttpClient, private storage: Storage) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(this.apiUrl + "/app/auth/login", credentials, { headers: headers })
        .subscribe((res: any) => {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(this.apiUrl + '/customers/register', data, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      var sto = this.storage;
      sto.get('user').then((val) => {
        if (val != null) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((err) => {
        reject(false);
      });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      var sto = this.storage;
      sto.get('user').then((val) => {
        console.log(val);
        resolve(val);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  isLoggedInNew() {
    return this.loggedIn;
  }

  facebookLogin(accessToken: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log(accessToken); 
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/externalauth/facebook', {  accessToken : accessToken }, { headers: headers })
        .subscribe(
          (res: any) => {
            localStorage.setItem('auth_token', res.auth_token);
            this.loggedIn = true;
            resolve(res);
          },
          (err) => {
            reject(err);
          });
    });
  }

}
