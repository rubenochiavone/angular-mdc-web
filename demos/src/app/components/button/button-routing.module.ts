import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Button, Api, Examples } from './button';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Button
];

const BUTTON_ROUTES: Routes = [
  {
    path: '', component: Button,
    children: [
      // { path: '', component: ProfileSearch },
      { path: 'api', component: Api },
      { path: 'examples', component: Examples }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(BUTTON_ROUTES)],
  exports: [RouterModule]
})
export class ButtonRoutingModule { }
