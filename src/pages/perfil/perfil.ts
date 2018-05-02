import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  user: any = {
    Nome: '',
    Sobrenome: ''
  };

  dados: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private loadingCtrl: LoadingController) {
    
    this.dados = "informacoes";

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    this.auth.getUser().then((res) => {
      this.user = res;
      loading.dismiss();
    });

    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
