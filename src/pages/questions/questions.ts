import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {SQLiteObject} from "@ionic-native/sqlite";
import {QuestionsProvider} from "../../providers/questions/questions";
import {ParticipantsProvider} from "../../providers/participants/participants";
import {FinalPage} from "../final/final";

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

  block:boolean = false;
  questnumber:number = 0;
  points:number = 0;
  sections:Array<string> = ['CERVEJA','CARNAVAL','MÚSICA','ARTISTAS','90'];
  answer_a:string = '';
  answer_b:string = '';
  answer_c:string = '';
  answer_d:string = '';

  style_resp_a:string = 'white';
  style_resp_b:string = 'white';
  style_resp_c:string = 'white';
  style_resp_d:string = 'white';

  questions: QuestionsProvider = new QuestionsProvider();
  history:Array<number>=[];
  order: Array<{section: number,difficulty: number}> = [{section: 1, difficulty: 5},{section: 1, difficulty: 10},{section: 2, difficulty: 5},{section: 2, difficulty: 10},{section: 3, difficulty: 5},{section: 3, difficulty: 10},{section: 4, difficulty: 5},{section: 4, difficulty: 10},{section: 5, difficulty: 5},{section: 5, difficulty: 10}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider, public questionsProvider: QuestionsProvider, public participantsProvider: ParticipantsProvider) {


  }

  ionViewDidLoad() {
      this.sortQuestion(this.order[this.questnumber].section,this.order[this.questnumber].difficulty)
  }

  respost(resp:string){

      if(this.block){
          return false;
      }
      this.block = true;

      if(this.questnumber >= 9){
          this.db.getDB()
              .then((db: SQLiteObject) => {
                  db.executeSql('UPDATE participants SET ranking = ? WHERE id = ?', [this.points, this.participantsProvider.id])
                      .then((data: any) => {
                          this.participantsProvider.ranking = this.points;
                          this.navCtrl.setRoot(FinalPage);
                          return true;
                      })
                      .catch(()=>{})
            })
      }


      if(resp == this.questions.correct_alternative){
          this.points+= 1;
          switch (resp) {
              case 'A':
                  this.style_resp_a = 'green';
                  break;
              case 'B':
                  this.style_resp_b = 'green';
                  break;
              case 'C':
                  this.style_resp_c = 'green';
                  break;
              case 'D':
                  this.style_resp_d = 'green';
                  break;
          }
      }else {

          switch (resp) {
              case 'A':
                  this.style_resp_a = 'red';
                  break;
              case 'B':
                  this.style_resp_b = 'red';
                  break;
              case 'C':
                  this.style_resp_c = 'red';
                  break;
              case 'D':
                  this.style_resp_d = 'red';
                  break;
          }

          switch (this.questions.correct_alternative) {
              case 'A':
                  this.style_resp_a = 'green';
                  break;
              case 'B':
                  this.style_resp_b = 'green';
                  break;
              case 'C':
                  this.style_resp_c = 'green';
                  break;
              case 'D':
                  this.style_resp_d = 'green';
                  break;
          }



      }

      var context = this;

      setTimeout(function () {
          context.reserQuestionNest();
      }, 3000);


  }

  sortQuestion(section, difficulty){
      this.db.getDB()
          .then((db: SQLiteObject) => {
              db.executeSql('SELECT * FROM questions WHERE section = ? AND difficulty = ? ORDER BY RANDOM() LIMIT 0,1', [section,difficulty])
                  .then((data: any) => {

                      this.questions.id = data.rows.item(0).id;
                      this.history.push(this.questions.id);
                      this.questions.question = data.rows.item(0).question;
                      this.questions.difficulty = data.rows.item(0).difficulty;
                      this.questions.correct_alternative = data.rows.item(0).correct_alternative;
                      this.questions.section = data.rows.item(0).section;
                      //console.log('Total de dados:', q);

                      console.log('Total de questions:', this.questions);

                      db.executeSql('SELECT * FROM answers WHERE question_id = ?', [this.questions.id])
                          .then((data: any) => {
                              this.answer_a = data.rows.item(0).answer;
                              this.answer_b = data.rows.item(1).answer;
                              this.answer_c = data.rows.item(2).answer;
                              this.answer_d = data.rows.item(3).answer;
                              this.block = false;



                          })
                          .catch(e => console.error('Erro ao tentar buscar uma question', e));


                  })
                  .catch(e => console.error('Erro ao tentar buscar uma question', e));

          })
          .catch(e => console.log(e));

  }

  reserQuestionNest(){
      this.style_resp_a = 'white';
      this.style_resp_b = 'white';
      this.style_resp_c = 'white';
      this.style_resp_d = 'white';
      this.sortQuestion(this.order[this.questnumber].section,this.order[this.questnumber].difficulty)
      this.questnumber+=1;
  }

}
