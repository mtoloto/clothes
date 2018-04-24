import { Component } from '@angular/core';

/**
 * Generated class for the PanelRightProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'panel-right-profile',
  templateUrl: 'panel-right-profile.html'
})
export class PanelRightProfileComponent {

  text: string;

  constructor() {
    console.log('Hello PanelRightProfileComponent Component');
    this.text = 'Hello World';
  }

}
