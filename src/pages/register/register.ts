import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  loginFormErrors: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, formBuilder: FormBuilder,
    private auth: AuthProvider,
    private fb: Facebook,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {

    this.registerForm = formBuilder.group({
      Nome: ['', [Validators.required]],
      Sobrenome: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Senha: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      SenhaConfirm: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.loginFormErrors = {
      Nome: {},
      Sobrenome: {},
      Username: {},
      Senha: {},
      SenhaConfirm: {},
    };

  } 

  ngOnInit() {
    this.registerForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      } 
      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }

    console.log(this.loginFormErrors);
  }
  
  formIsValid(): boolean {
    return this.registerForm.status == "VALID";
  }

  doRegister() {
    let loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });
    loading.present();
    this.auth.register(this.registerForm.value).then(
      (res: any) => {
        if (res.Sucesso) {

          this.auth.setUser(res.Objetos[0]); 
          this.navCtrl.setRoot(HomePage);

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

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log(e));
  }

}
