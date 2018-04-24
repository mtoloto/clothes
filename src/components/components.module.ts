import { NgModule } from '@angular/core';
import { ButtonProfileComponent } from './button-profile/button-profile';
import { IonicModule } from 'ionic-angular';
import { PanelRightProfileComponent } from './panel-right-profile/panel-right-profile';
@NgModule({
	declarations: [
		ButtonProfileComponent,
		PanelRightProfileComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		ButtonProfileComponent,
		PanelRightProfileComponent
	],
	entryComponents: [
		PanelRightProfileComponent
	]
})
export class ComponentsModule { }
