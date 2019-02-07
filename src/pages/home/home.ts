import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ParticipantsPage} from "../participants/participants";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  startQuiz(){
    this.navCtrl.push(ParticipantsPage);
  }

}
