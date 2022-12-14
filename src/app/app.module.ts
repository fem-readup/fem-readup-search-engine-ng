import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {UiModule} from "./core/ui/ui.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ServiceWorkerModule} from "@angular/service-worker";
import {getFirestore} from "@angular/fire/firestore/lite";
import {provideFirestore} from "@angular/fire/firestore/lite";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {EventModule} from "./core/event/event.module";
import {TRANSLOCO_CONFIG, TRANSLOCO_MISSING_HANDLER, TranslocoConfig, TranslocoModule} from "@ngneat/transloco";
import {TranslocoUndefMissingHandler} from "./transloco-missing-handler";
import {translocoLoader} from "./transloco.loader";
import {TranslocoMessageFormatModule} from "@ngneat/transloco-messageformat";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),

    EventModule,
    UiModule,

    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    TranslocoModule,
    TranslocoMessageFormatModule.forRoot()
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['de'],
        listenToLangChange: false,
        defaultLang: 'de',
        fallbackLang: ['de'],
        prodMode: environment.production
      } as TranslocoConfig
    },
    {
      provide: TRANSLOCO_MISSING_HANDLER,
      useClass: TranslocoUndefMissingHandler
    },
    translocoLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
