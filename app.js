const express = require('express');
const app= new express();
require('dotenv').config();
const port = process.env.PORT || 5050;


var Tweetdata=require('./src/model/tweets'); //model for mongo db
var Twitter = require('twitter'); 
 
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');

// setting tokens
const apikey=process.env.apikey;
const apisecret=process.env.apisecret;
const bearertoken=process.env.bearertoken;


app.get('/',function(req,res){
    res.render('home',{
        title: "Home",
        flag:false
    })
    
})


var client = new Twitter({
  consumer_key: apikey,
  consumer_secret: apisecret,
  bearer_token: bearertoken
});

var filter='';
var model, models = [];
var retweetflag=false;


app.post('/tweets/filter',function(req,res){
    filter=req.body.searchfilter;
    
    //search based on  hash tags
    var params = {q: filter};
    client.get('search/tweets', params, function(error, tweets, response) {
        if (!error) {
        for(i=0;i<tweets.statuses.length;i++){
            if(tweets.statuses[i].retweet_count>0){
                retweetflag=true;
            }
            else{
                retweetflag=false;
            }
            //setting value for mongodb
            model = new Tweetdata();
            model.DateofTweet=tweets.statuses[i].created_at;
            model.TweetDescription=tweets.statuses[i].text;
            model.Username=tweets.statuses[i].user.name;
            model.location=tweets.statuses[i].user.location;
            model.timezone=tweets.statuses[i].user.time_zone;
            model.retweets=retweetflag;
            model.retweetcount=tweets.statuses[i].retweet_count;
            model.searchfilter=filter;
            console.log(model)
            models.push(model);
            // console.log(models)
            // var item={
            //     DateofTweet:tweets.statuses[i].created_at,
            //     TweetDescription:tweets.statuses[i].text,
            //     Username:tweets.statuses[i].user.name,
            //     location:tweets.statuses[i].user.location,
            //     timezone:tweets.statuses[i].user.time_zone,
            //     retweets:retweetflag,
            //     retweetcount:tweets.statuses[i].retweet_count,
            //     searchfilter:filter
            // }
            
            // adding documnet to mongodb collection
            // var tweet=Tweetdata(item)
            // tweet.save();
        }

        //adding documents bulk insert
        Tweetdata.bulkInsert(models
            , function(err, results) {
            if (err) {
              console.log(err);
        //       process.exit(1);
            } else {
              console.log(results);
        //       process.exit(0);
            }
          }
          ); 
        }
    })
    //retrieving values from mongo db
    Tweetdata.find({searchfilter:filter})
    .then(function(tweets){
        res.render('home',{
            title:"Home",
            tweets,
            flag:true
        })
        //console.log(tweets);
    });
});
//filter on retweetes
app.post('/filterretweets',function(req,res){
    var flag=req.body.retweetfilter;
   
    if(flag=="notretweeted"){
        Tweetdata.find({searchfilter:filter,retweets:false})
        .then(function(tweets){
            res.render('home',{
                title:"Home",
                tweets,
                flag:true
            })
            // console.log(tweets);
        });
    }
    else if(flag=="retweeted"){
        Tweetdata.find({searchfilter:filter,retweets:true})
        .then(function(tweets){
            res.render('home',{
                title:"Home",
                tweets,
                flag:true
            })

        });
    }
    else{
        Tweetdata.find({searchfilter:filter})
        .then(function(tweets){
            res.render('home',{
                title:"Home",
                tweets,
                flag:true
            })

        });
    }
})



app.listen(port,()=>{
    console.log("Server ready at port:"+port);
});
