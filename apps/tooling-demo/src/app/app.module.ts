import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  AngularFireAuth,
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/auth';
import {
  SETTINGS,
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
} from '@angular/fire/firestore';
import {
  ORIGIN as FUNCTIONS_ORIGIN,
  NEW_ORIGIN_BEHAVIOR,
  USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
} from '@angular/fire/functions';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AngularFireAuth],
      useFactory: initializeApp,
    },
    {
      provide: SETTINGS,
      useValue: window.Cypress
        ? {
            experimentalForceLongPolling: true,
            merge: true,
          }
        : SETTINGS,
    },
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 9099],
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 8080],
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 5001],
    },
    { provide: NEW_ORIGIN_BEHAVIOR, useValue: true },
    {
      provide: FUNCTIONS_ORIGIN,
      useFactory: () => (environment.production ? location.origin : undefined),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initializeApp(afAuth: AngularFireAuth): () => Promise<null> {
  return () => {
    return new Promise((resolve) => {
      if (environment.production) {
        return resolve(null);
      } else {
        afAuth.useEmulator(`http://${location.hostname}:9099/`).then(() => {
          resolve(null);
        });
      }
    });
  };
}
