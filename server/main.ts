import { Meteor } from 'meteor/meteor';

// Fixtures
import { loadItems } from './imports/fixtures/items';
import {Facebook, FacebookApiException} from 'fb';

// Publish
import './imports/publications/items';

Meteor.startup(() => {
  loadItems();
});
