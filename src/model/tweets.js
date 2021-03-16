const mongoose =require("mongoose");
mongoose.connect('mongodb+srv://userone:userone@tweetcluster.mod3v.mongodb.net/tweetsearch?retryWrites=true&w=majority');
const Schema= mongoose.Schema;


const TweetSchema = new Schema({
    DateofTweet:String,
    TweetDescription:String,
    Username:String,
    location:String,
    timezone:String,
    retweets:Boolean,
    retweetcount:Number,
    searchfilter:String
});

<<<<<<< HEAD
<<<<<<< HEAD
var Tweetdata = mongoose.model('tweetdata', TweetSchema);

=======
TweetSchema.statics.bulkInsert = function(models, fn) {
    if (!models || !models.length)
      return fn(null);
  
    var bulk = this.collection.initializeUnorderedBulkOp();
    if (!bulk)
      return fn('bulkInsertModels: MongoDb connection is not yet established');
  
    var model;
    for (var i=0; i<models.length; i++) {
      model = models[i];
      bulk.insert(model.toJSON());
    }
  
    bulk.execute(fn);
  };

var Tweetdata = mongoose.model('tweetdata', TweetSchema);
>>>>>>> 24e0095 (bulkset commit)
=======
var Tweetdata = mongoose.model('tweetdata', TweetSchema);

>>>>>>> 45b498a94a8d723ef15072de46ba2f61e253397f
module.exports = Tweetdata;