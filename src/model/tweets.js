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
module.exports = Tweetdata;