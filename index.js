require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

shortLinks = []

app.post('/api/shorturl/',function(req,res){
  var rawURL = req.body.url;

  try {
    url = new URL(rawURL);

    if (url.protocol === "http:" || url.protocol === "https:") {
      
      var short = shortLinks.length;
      shortLinks.push({"original_url":req.body.url,"short_url":short})
      res.json({"original_url":req.body.url,"short_url":short})

    } else {
      return res.json({"error":"Invalid URL"})      
    }

    console.log(url.protocol)
  } catch (_) {
    return res.json({"error":"Invalid URL"})
  }


})

app.get('/api/shorturl/:shorturl/',function(req,res){
  var short = Number(req.params.shorturl);
  // console.log(Number(req.params.shorturl),shortLinks,shortLinks[short],shortLinks[short].original_url)
  res.redirect(shortLinks[short].original_url);
  res.end();
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
