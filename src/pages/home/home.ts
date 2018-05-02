import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { AvisoPage } from '../aviso/aviso';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private menu: MenuController, private auth: AuthProvider) { }

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

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    setTimeout(() => {
      this.menu.enable(true, "menu");
    }, 0);

  }

  logout() {
    let loading = this.loadingCtrl.create({
      content: 'Saindo...'
    });
    loading.present();
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
    loading.dismiss();
  }

  goToAviso() {
    this.navCtrl.push(AvisoPage);
  }


}
