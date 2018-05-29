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
import { UserService } from '../services/user.service';
import { HttpModule } from '@angular/http';
import { ConfigService } from '../utils/config.service';
import { PhoneLoginPage } from '../pages/phonelogin/phonelogin';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { PhoneLoginProvider } from '../providers/phonelogin/phonelogin';
import { BaseProvider } from '../providers/base/base';
import { PhoneConfirmationPage } from '../pages/phone-confirmation/phone-confirmation';
import { PhoneRegisterPage } from '../pages/phone-register/phone-register';

@NgModule({
  declarations: [
    Clothes,
    HomePage,
    TutorialPage,
    LoginPage,
    RegisterPage,
    AvisoPage,
    PerfilPage,
    PhoneLoginPage,
    PhoneConfirmationPage,
    PhoneRegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    IonicModule.forRoot(Clothes, {}, {
      links: [
        { component: PhoneLoginPage, name: 'PhoneLoginPage', segment: 'phonelogin' },
        { component: TutorialPage, name: 'TutorialPage', segment: 'tutorial' },
        { component: HomePage, name: 'HomePage', segment: 'home' },
        { component: PerfilPage, name: 'PerfilPage', segment: 'perfil' }, 
        { component: PhoneConfirmationPage, name: 'PhoneConfirmationPage', segment: 'phoneConfirmation' }
      ]
    }),
    IonicStorageModule.forRoot(),
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Clothes,
    HomePage,
    TutorialPage,
    LoginPage,
    RegisterPage,
    AvisoPage,
    PerfilPage,
    PhoneLoginPage,
    PhoneConfirmationPage,
    PhoneRegisterPage
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    UserService,
    Dialogs,
    ConfigService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    PhoneLoginProvider,
    BaseProvider
  ]
})
export class AppModule { }
