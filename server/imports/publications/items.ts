import { Meteor } from 'meteor/meteor';
import { Items } from '../../../both/collections/items.collection';

Meteor.publish('items', function() {
    return Items.find({});
});

Meteor.publish('item', function(itemId: string) {
    return Items.find({_id: itemId});
});

// function buildQuery(partyId?: string): Object {
//     const isAvailable = {
//         $or:[{
//             public: true
//         },
//         {
//             $and: [{
//                 owner: this.userId
//             },
//             {
//                 owner: {
//                     $exists: true
//                 }
//             }]
//         }]
//     };

//     if (partyId) {
//         return {
//             $and: [{
//                 _id: partyId
//             },
//                 isAvailable
//             ]
//         };
//     }

//     return isAvailable;
// };