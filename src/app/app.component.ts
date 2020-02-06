import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home page',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Bulletin/Circular/Manual',
      url: '/list',
      icon: 'copy'
    },
    {
      title: 'Crew Roster',
      //url: '/',
      icon: 'airplane'
    },
    {
      title: 'Crew on flight',
      //url: '/',
      icon: 'people'
    },
    {
      title: 'Roster Report',
      //url: '/',
      icon: 'calendar'
    },
    {
      title: 'Fatigue form',
      //url: '/',
      icon: 'chatbubbles'
    },
    {
      title: 'My Fatigue form',
      //url: '/',
      icon: 'chatboxes'
    },
    {
      title: 'Crew Profile',
      //url: '/',
      icon: 'person'
    },
    {
      title: 'FDP Calculation',
      //url: '/',
      icon: 'calculator'
    },
    {
      title: 'Port Information',
      //url: '/',
      icon: 'text'
    },
    {
      title: 'Performance Appraisal',
      //url: '/',
      icon: 'checkbox-outline'
    },
    {
      title: 'Cabin Crew Record',
      //url: '/',
      icon: 'alert'
    },
    {
      title: 'Cabin Crew Personal Report',
      //url: '/',
      icon: 'document'
    },
    {
      title: 'SSQ Report',
      //url: '/',
      icon: 'images'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
