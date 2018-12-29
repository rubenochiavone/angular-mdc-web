import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared.module';
import { DialogExampleModule } from './components/dialog-demo/dialog-example.module';
import { AppComponent } from './app.component';
import { AppRoutingModule, DEMO_DECLARATIONS } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    DialogExampleModule
  ],
  declarations: [
    AppComponent,
    DEMO_DECLARATIONS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
