import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneRegisterPage } from './phone-register';

@NgModule({
  declarations: [
    PhoneRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneRegisterPage),
  ],
})
export class PhoneRegisterPageModule {}
