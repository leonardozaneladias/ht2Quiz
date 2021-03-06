import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ParticipantsProvider} from "../../providers/participants/participants";
import {HomePage} from "../home/home";

/**
 * Generated class for the FinalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-final',
  templateUrl: 'final.html',
})
export class FinalPage {

  winner = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public participantsProvider: ParticipantsProvider) {

    if(participantsProvider.ranking == 10){
      this.winner = true;
    }

  }

  ionViewDidLoad() {

  }

  reset(){
    this.navCtrl.setRoot(HomePage);
  }

}
