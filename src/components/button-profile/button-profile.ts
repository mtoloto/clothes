import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { PanelRightProfileComponent } from '../panel-right-profile/panel-right-profile';

/**
 * Generated class for the ButtonProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'button-profile',
  templateUrl: 'button-profile.html'
})
export class ButtonProfileComponent { 

  constructor(private popoverCtrl: PopoverController) {  
  }

  presentRadioPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(PanelRightProfileComponent);

    popover.present({
      ev: ev
    });
  }

}
