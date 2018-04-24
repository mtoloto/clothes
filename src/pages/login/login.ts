import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UserOptions } from '../../interfaces/user-options';
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
  login: UserOptions = { username: '', password: '' };
  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: Facebook, 
    formBuilder: FormBuilder,
    private auth: AuthProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {

    this.loginForm = formBuilder.group({
      Username: ['', [Validators.required]],
      Senha: ['', Validators.compose([Validators.minLength(6), Validators.required])]
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
        if (res.Sucesso) {
          this.auth.setUser(res.Objetos[0]); 
          this.navCtrl.setRoot(HomePage)
        }
        else {
          let toast = this.toastCtrl.create({
            message: res.Mensagem,
            duration: 3000,
            cssClass: 'alert-user-not-found',
            position: 'top'
          });

          toast.present();
        }
        loading.dismiss();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }).catch(
        (res) => {
          console.log(res);
          loading.dismiss();
        });
  }
  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }
  
  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log(e));
  }

}
