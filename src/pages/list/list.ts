import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {SQLiteObject} from "@ionic-native/sqlite";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

    listOne: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {


  }

  ionViewDidLoad() {
    this.getRaking();
  }

  getRaking() {
    this.db.getDB()
        .then((db: SQLiteObject) => {
          db.executeSql('SELECT name, ranking FROM participants ORDER BY ranking DESC, name ASC', {})
              .then((data: any) => {
                  for (var i = 0; i < data.rows.length; i++) {
                      var parts = data.rows.item(i);
                      this.listOne.push(parts);
                  }
              })
        })
        .catch((e)=>{
            console.error('erro', e)
        });
  }
}
