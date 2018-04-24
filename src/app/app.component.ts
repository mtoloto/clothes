import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
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
            splashScreen.hide();
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

}

