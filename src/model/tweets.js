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

var Tweetdata = mongoose.model('tweetdata', TweetSchema);

module.exports = Tweetdata;