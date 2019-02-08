import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ParticipantsPage} from "../pages/participants/participants";
import {DatabaseProvider} from "../providers/database/database";
import {FinalPage} from "../pages/final/final";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FinalPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    this.initializeApp(dbProvider);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'QUIZ', component: HomePage },
      { title: 'RANKING', component: ListPage }
    ];



  }

  initializeApp(dbProvider: DatabaseProvider) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      //Criando o banco de dados
      dbProvider.createDatabase()
          .then(() => {
            // fechando a SplashScreen somente quando o banco for criado
            this.splashScreen.hide();
          })
          .catch(() => {
            // ou se houver erro na criação do banco
            this.splashScreen.hide();
          });


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
