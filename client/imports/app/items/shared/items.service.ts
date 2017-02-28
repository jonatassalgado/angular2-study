import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Items } from '../../../../../both/collections/items.collection';
import { Item } from '../../../../../both/models/item.model';

@Injectable()
export class ItemsService {

  private itemsFoundSource = new Subject<Observable<Item[]>>();
  itemsFound$ = this.itemsFoundSource.asObservable();

  getCategories(): Array<string> {
    return [
      "Lazer",
      "Esporte",
      "Cinema",
      "Cultura",
      "Alimentação",
      "Saúde",
      "Música"];
  }

  getOccasions(): Array<string> {
    return [
      "Amigos",
      "Família",
      "Crianças",
      "Namoro"];
  }

  getActivities(): Array<string> {
    return [
      "Caminhar",
      "Correr",
      "Andar de Bicicleta",
      "Comprar",
      "Pegar um sol",
      "Curtir",
      "Dançar",
      "Aprender",
      "Sair",
      "Comer"];
  }

  findItem(value: string) {
    let items = Items.find(value ? { name: { $regex: value, $options: 'i' } } : {}).zone();
    this.itemsFoundSource.next(items);
  }

}