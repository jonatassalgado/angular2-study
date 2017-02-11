import { Component } from '@angular/core';

import template from './navbar.component.html';
import { ItemsService } from '../items/shared/items.service';
import { Items } from '../../../../both/collections/items.collection';

@Component({
  selector: 'navbar',
  template
})
export class NavbarComponent {

  constructor(private itemsService: ItemsService) { }


   search(value: string): void {
    this.itemsService.findItem(value)
  }
}