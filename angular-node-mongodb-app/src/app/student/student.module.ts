import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '../dialog/dialog.module';


const routes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'edit/:rollNumber', component: EditComponent},
  {path: 'add', component: EditComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentModule { }
