import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module'


import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

import { Clothes } from './app.component';
import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { RegisterPage } from '../pages/register/register';
import { Dialogs } from '@ionic-native/dialogs';
import { AvisoPage } from '../pages/aviso/aviso';
import { PerfilPage } from '../pages/perfil/perfil';


@NgModule({
  declarations: [
    Clothes,
    HomePage,
    TutorialPage,
    LoginPage,
    RegisterPage,
    AvisoPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(Clothes, {}, {
      links: [
        { component: TutorialPage, name: 'TutorialPage', segment: 'tutorial' },
        { component: HomePage, name: 'HomePage', segment: 'home' },
        { component: PerfilPage, name: 'PerfilPage', segment: 'perfil' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Clothes,
    HomePage,
    TutorialPage,
    LoginPage,
    RegisterPage,
    AvisoPage,
    PerfilPage
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    Dialogs,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider
  ]
})
export class AppModule { }
