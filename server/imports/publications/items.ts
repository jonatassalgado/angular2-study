import { Meteor } from 'meteor/meteor';
import { Items } from '../../../both/collections/items.collection';
import { itemsParams } from '../params/items.params';

Meteor.publish('items', function(params: itemsParams) {
    if (params && params['city']) {
        return Items.find({city: params.city});
    } else {
        return Items.find({});
    }
});

Meteor.publish('item', function(itemId: string) {
    return Items.find({_id: itemId});
});