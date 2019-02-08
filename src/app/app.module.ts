import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ParticipantsPage} from "../pages/participants/participants";
import {QuestionsPage} from "../pages/questions/questions";
import {SQLite} from "@ionic-native/sqlite";
import {DatabaseProvider} from '../providers/database/database';
import { QuestionsProvider } from '../providers/questions/questions';
import { ParticipantsProvider } from '../providers/participants/participants';
import {FinalPage} from "../pages/final/final";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        ParticipantsPage,
        QuestionsPage,
        FinalPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        ParticipantsPage,
        QuestionsPage,
        FinalPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        SQLite,
        DatabaseProvider,
    QuestionsProvider,
    ParticipantsProvider,
    ]
})
export class AppModule {
}
