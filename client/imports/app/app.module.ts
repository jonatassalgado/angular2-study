import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui'

// Components
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ItemsService } from './items/shared/items.service';
import { ITEMS_DECLARATIONS } from './items';
import { NAVBAR_DECLARATIONS } from './navbar';

// Providers
import { ROUTES_PROVIDERS } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule
  ],
  declarations: [
    AppComponent,
    ...ITEMS_DECLARATIONS,
    ...NAVBAR_DECLARATIONS
  ],
  providers: [
    ...ROUTES_PROVIDERS,
      ItemsService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
