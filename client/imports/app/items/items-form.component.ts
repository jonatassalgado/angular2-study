import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

// Templates
import template from './items-form.component.html';

// Collections
import { Items } from '../../../../both/collections/items.collection';

@Component({
  selector: 'items-form',
  template
})

export class ItemsFormComponent implements OnInit {
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [],
      price: [],
      rate: [],
    });
  }

  addItem(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a party');
      return;
    }

    if (this.addForm.valid) {
      Items.insert(
        Object.assign(
          {},
          this.addForm.value,
          {
            owner: Meteor.userId(),
            createdAt: Date.now()
          }
        )
      );
      this.router.navigate(['/']);
    }

  }

}
