import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule, AngularFireStorageModule, AngularFireModule.initializeApp(environment.firebaseConfig), FileUploadModule],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [],
  exports: []
})
export class AppModule { }
