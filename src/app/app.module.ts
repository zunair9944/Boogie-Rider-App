import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { PusherService } from './services/pusher/pusher.service' //'./services/pusher/pusher.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { UsersService } from './services/user/user.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    PusherService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Chooser,
    SplashScreen,
    CallNumber,
    UsersService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
