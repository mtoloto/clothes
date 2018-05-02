import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://192.168.0.178:817/api/';

@Injectable()
export class AuthProvider {
 
  constructor(private http: HttpClient, private storage: Storage) { }

  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
      console.log(credentials);
      this.http.post(apiUrl + "login", credentials, { headers: headers })
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
    this.storage.set("user", user);
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
}
