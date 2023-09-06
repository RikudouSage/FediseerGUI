import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlossaryComponent } from './pages/glossary/glossary.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: GlossaryComponent,
  }
];

@NgModule({
  declarations: [
    GlossaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class GlossaryModule { }
