import { HTTP } from 'meteor/http';
import { Items } from '../../both/collections/items.collection';
import { Meteor } from 'meteor/meteor';
import { Observable } from 'rxjs/Rx';

if (Meteor.isServer) {
  Meteor.methods({
    getEventFromFB: function(event: any){
      let httpSync = Meteor.wrapAsync(HTTP.call, HTTP);
      let request = httpSync('GET', 'https://graph.facebook.com/v2.8/' + event.id + '?fields=cover,name,description,id,category,place,start_time,end_time,is_canceled,ticket_uri,attending_count&access_token=415937578745895|C0fyZ6wi7C7SVFgt1bSaaBoRfcI')

      check(request.data, Object);

      return request.data;
    }
  });
}