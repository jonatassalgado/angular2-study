import { Route, Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';


// Components
import { ItemsListComponent } from './items/items-list.component';
import { ItemsFormComponent } from './items/items-form.component';
import { ItemDetailsComponent } from './items/item-details.component';

export const routes: Route[] = [
    { path: '', component: ItemsListComponent },
    { path: ':city', component: ItemsListComponent },
    { path: 'items/new', component: ItemsFormComponent },
    { path: 'items/:itemId', component: ItemDetailsComponent }
]

export const ROUTES_PROVIDERS = [{
    provide: 'canActivateForLoggedIn',
    useValue: () => !! Meteor.userId()
}]
