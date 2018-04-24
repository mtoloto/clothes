import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://192.168.0.178:816/';

@Injectable()
export class AuthProvider {

  constructor(private http: HttpClient, private storage: Storage) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(apiUrl + 'ServicosCliente/Login', credentials)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + 'ServicosCliente/CadastroPrimario', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() { 
    var sto = this.storage;
    sto.remove('user');
  }

  setUser(user) {
    console.log(user);
    this.storage.set("user", user);
  }

  isLoggedIn() { 
    return new Promise((resolve, reject) => {
      var sto = this.storage;
      sto.get('user').then((val) => {
        if (val != null) {
          resolve(true);
        }
        else{
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
}
