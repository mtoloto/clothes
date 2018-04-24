import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private auth: AuthProvider) { }
 
  ionViewCanEnter() {
    return new Promise((resolve, reject) => {
      this.auth.isLoggedIn().then((res: boolean) => {
        if (!res) {
          setTimeout(() => {
            this.navCtrl.setRoot(LoginPage);
          }, 0);
        }
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
