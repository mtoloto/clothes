import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: Facebook,
    formBuilder: FormBuilder,
    private auth: AuthProvider,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {

    this.loginForm = formBuilder.group({
      UserName: ['', [Validators.required]],
      Password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
  }

  formIsValid(): boolean {
    return this.loginForm.status == "VALID";
  }

  doLogin() {

    let loading = this.loadingCtrl.create({
      content: 'Logando...'
    });

    loading.present();
    this.auth.login(this.loginForm.value).then(
      (res: any) => {
        this.navCtrl.setRoot(HomePage)
        loading.dismiss();
      },
      (err) => {
        this.showToast("Usuário ou senha inválidos.");
        loading.dismiss();
      }).catch(
        (res) => {
          this.showToast("Não foi possível fazer o login, tente novamente.");
          loading.dismiss();
        });
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  fbLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Logando...'
    });
    loading.present();

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
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

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    setTimeout(() => {
      this.menu.enable(false, "menu");
    }, 0);
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

  showLoading() {

  }

}
