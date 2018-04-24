import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';


import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

import { Clothes } from './app.component';
import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth'; 
import { RegisterPage } from '../pages/register/register';

@NgModule({
  declarations: [
    Clothes,
    HomePage,
    TutorialPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(Clothes, {}, {
      links: [ 
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: HomePage, name: 'HomePage', segment: 'home' }
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
    RegisterPage
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
