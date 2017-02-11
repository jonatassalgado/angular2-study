import { Meteor } from 'meteor/meteor';

// Fixtures
import { loadItems } from './imports/fixtures/items';

// Publish
import './imports/publications/items';

Meteor.startup(() => {
  loadItems();
});
