import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PhoneLoginProvider } from '../../providers/phonelogin/phonelogin';
import { PhoneRegisterPage } from '../phone-register/phone-register';

/**
 * Generated class for the PhoneConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phone-confirmation',
  templateUrl: 'phone-confirmation.html',
})
export class PhoneConfirmationPage {

  @ViewChild('code1') code1;
  @ViewChild('code2') code2;
  @ViewChild('code3') code3;
  @ViewChild('code4') code4;

  code: string = "";
  teste: string = "";
  erroCode: string = "";

  code1Model: string = "";
  code2Model: string = "";
  code3Model: string = "";
  code4Model: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private phoneLogin: PhoneLoginProvider,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.code1.setFocus();
    }, 1000);
  }

  changeFocus(index, ev) {
    if (ev.keyCode == 8)
      index = index - 2;

    switch (index) {
      case 1:
        this.code1.setFocus();
        break;

      case 2:
        this.code2.setFocus();
        break;

      case 3:
        this.code3.setFocus();
        break;

      case 4:
        this.code4.setFocus();
        break;
    }
    this.code = this.code1Model + this.code2Model + this.code3Model + this.code4Model;

    if (this.code.length == 4) {
      this.verifyCode();
    } else {
      this.erroCode = "";
    }
  }
  verifyCode() {

    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();
    this.phoneLogin.verifyCode(this.code).subscribe((res: any) => {
      this.erroCode = "";
      loading.dismiss();

      //ask the fields for register
      this.navCtrl.push(PhoneRegisterPage)
    },
      (err: any) => {
        this.erroCode = "erro-code";
        loading.dismiss();
      });

  }

}
