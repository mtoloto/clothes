import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class Clothes {
  rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
    statusBar: StatusBar,
    storage: Storage,
    private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.2
      statusBar.styleDefault();


      // Check if the user has already seen the tutorial
      storage.get('hasSeenTutorial')
        .then((hasSeenTutorial) => {
          if (hasSeenTutorial) {
            this.rootPage = HomePage;
            splashScreen.hide();
          } else {
            this.rootPage = TutorialPage;
            //splashScreen.hide();
          }
          this.platformReady()
        });
    });
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  openPage(page: string) {
    // Set the root of the nav with params if it's a tab index
    this.nav.setRoot(page).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }

  isActive(page: string) {  
    if (this.nav.getActive() && this.nav.getActive().name === page) {
      return 'default';
    }
    return;
  }
}

