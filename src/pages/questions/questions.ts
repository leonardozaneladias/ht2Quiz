import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {SQLiteObject} from "@ionic-native/sqlite";

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  questnumber:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {


  }

  ionViewDidLoad() {
    this.db.getDB()
        .then((db: SQLiteObject) => {

          db.executeSql('SELECT * FROM questions', {})
              .then((data: any) => {
                console.log('Total de dados:', data.rows.length);

              })
              .catch(e => console.error('Erro ao incluir dados padrões', e));

        })
        .catch(e => console.log(e));

      this.db.getDB()
          .then((db: SQLiteObject) => {

              db.executeSql('SELECT * FROM answers', {})
                  .then((data: any) => {
                      console.log('Total de respostas:', data.rows.length);

                  })
                  .catch(e => console.error('Erro ao incluir dados padrões', e));

          })
          .catch(e => console.log(e));
  }

}
