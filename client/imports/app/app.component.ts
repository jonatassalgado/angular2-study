// Modules
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';

// Templates
import template from './app.component.html';

// Collections
import { Items } from '../../../both/collections/items.collection';

// Model
import { Item } from '../../../both/models/item.model';


@Component({
  selector: 'app',
  template: template
})

export class AppComponent implements OnInit {
  ngOnInit() {
    $('.ui.dropdown').dropdown();
  }
}
