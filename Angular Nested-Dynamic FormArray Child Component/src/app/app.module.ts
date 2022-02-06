import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { SectionComponent } from './section/section.component';
import { SubSectionComponent } from './sub-section/sub-section.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SectionComponent,
    SubSectionComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
