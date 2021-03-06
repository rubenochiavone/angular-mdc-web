import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Elevation} from './elevation';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Elevation
];

const ROUTES: Routes = [
  {
    path: '', component: Elevation,
    children: [
      {path: '', redirectTo: 'api'},
      {path: 'api', component: Api},
      {path: 'examples', component: Examples}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
