import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, Sass, Button } from './button-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  Button
];

const BUTTON_ROUTES: Routes = [
  {
    path: '', component: Button,
    children: [
      { path: '', redirectTo: 'api' },
      { path: 'api', component: Api },
      { path: 'sass', component: Sass },
      { path: 'examples', component: Examples }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(BUTTON_ROUTES)],
  exports: [RouterModule]
})
export class ButtonRoutingModule { }
