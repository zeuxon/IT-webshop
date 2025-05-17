import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

const firebaseConfig = {
  apiKey: "AIzaSyCzOI5u0dV3jMCD28DB7BALpRrkzn70vz8",
  authDomain: "it-project-1ed16.firebaseapp.com",
  projectId: "it-project-1ed16",
  storageBucket: "it-project-1ed16.firebasestorage.app",
  messagingSenderId: "113810752207",
  appId: "1:113810752207:web:7af51485633ffbe5a56dba"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};
