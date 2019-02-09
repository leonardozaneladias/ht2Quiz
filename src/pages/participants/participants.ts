import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {QuestionsPage} from "../questions/questions";
import {DatabaseProvider} from "../../providers/database/database";
import {SQLiteObject} from "@ionic-native/sqlite";
import {ParticipantsProvider} from "../../providers/participants/participants";
import {Keyboard} from "@ionic-native/keyboard";

/**
 * Generated class for the ParticipantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-participants',
    templateUrl: 'participants.html',
})
export class ParticipantsPage {

    @ViewChild('focusInput') myInput ;

    name = '';
    email = '';
    phone = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider, public participantsProvider: ParticipantsProvider, private keyboard: Keyboard) {
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.keyboard.show();
            this.myInput.setFocus();
        },1000); //a least 150ms.
    }


    store() {

        if (this.name == '' || this.email == '' || this.phone == '') {
           alert('Todos os campos são obrigatórios');
           return false;
        }


        this.db.getDB()
            .then((db: SQLiteObject) => {
                db.executeSql('INSERT INTO participants (name,email,phone,ranking) VALUES (?,?,?,?)', [this.name, this.email, this.phone, 0])
                    .then((data: any) => {
                        db.executeSql('SELECT id FROM participants WHERE name = ? AND email = ?', [this.name, this.email])
                            .then((data: any) => {
                                this.participantsProvider.id = data.rows.item(0).id;
                                this.participantsProvider.name = data.rows.item(0).name;
                                this.participantsProvider.email = data.rows.item(0).email;
                                this.participantsProvider.phone = data.rows.item(0).phone;

                                this.navCtrl.setRoot(QuestionsPage);
                            })
                            .catch(() => {
                                console.log("Error2");
                            })
                    })
                    .catch(() => {
                        console.log("Error");
                    })


            })
    }
}

