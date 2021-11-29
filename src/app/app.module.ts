import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { BgColorDirective } from './directives/bg-color.directive';
import { EncryptMobNumPipe } from './pipes/encrypt-mob-num.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppToolbarComponent } from './app-sections/tool-bar/app-toolbar.component';
import { MaterialModule } from './material/material.module';
import { BodyComponent } from './app-sections/body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    BgColorDirective,
    EncryptMobNumPipe,
    AppToolbarComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
