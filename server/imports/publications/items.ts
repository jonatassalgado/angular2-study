import { Meteor } from 'meteor/meteor';
import { Items } from '../../../both/collections/items.collection';
import { itemsParams } from '../params/items.params';

Meteor.publish('items', function(params: itemsParams) {
    return Items.find({city: params.city});
});

Meteor.publish('item', function(itemId: string) {
    return Items.find({_id: itemId});
});