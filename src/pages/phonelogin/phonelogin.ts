import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { PhoneLoginProvider } from '../../providers/phonelogin/phonelogin';
import { PhoneConfirmationPage } from '../phone-confirmation/phone-confirmation';

/**
 * Generated class for the PhoneloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phonelogin',
  templateUrl: 'phonelogin.html',
})
export class PhoneLoginPage {

  classAux: string = "";
  fieldCelphoneFocus: boolean = false;
  phone: string = "";
  constructor(public navCtrl: NavController,
    public menu: MenuController,
    public navParams: NavParams,
    private fb: Facebook,
    private auth: AuthProvider,
    private phoneLogin: PhoneLoginProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() { 
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    setTimeout(() => {
      this.menu.enable(false, "menu");
    }, 0);

  }

  fbLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Logando...'
    });
    loading.present();

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.auth.facebookLogin(res.authResponse.accessToken)
          .then(
            (res: any) => {
              this.navCtrl.setRoot(HomePage);
              loading.dismiss();
            }, (err) => {
              this.showToast("Não foi possível fazer login.");
              loading.dismiss();
            })
          .catch((err) => {
            this.showToast("Não foi possível fazer login.");
            loading.dismiss();
          });
      })
      .catch(e => {
        this.showToast("Não foi possível fazer login.");
        loading.dismiss();
      });
  }

  addHeight() {
    this.classAux = "height-100";
    this.fieldCelphoneFocus = true;
  }
  removeHeight() {
    this.classAux = "";
    this.fieldCelphoneFocus = false;
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: '',
      position: 'top'
    });
    toast.present();
  }

  postPhone() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present(); 
    this.phoneLogin.postPhone(this.phone).subscribe((res: any) => {
      this.navCtrl.push(PhoneConfirmationPage);
      loading.dismiss();
    },
      (err: any) => {
        loading.dismiss();
      });
  }
}
