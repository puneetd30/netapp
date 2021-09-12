const express = require('express')
const app = express()
const port = process.env.PORT || 8000
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const config = require('./config');
// app.use(express.static('public'))
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))


var MongoClient = require('mongodb').MongoClient;


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/register', jsonParser, (req, res) => {
  const appId = req.body.appId;
  const freq = req.body.freq;
  const appUrl = req.body.appUrl;
  const headerArr = req.body.headers;
  MongoClient.connect(`${config.url}`, async (err, client) => {

    if (err) throw err;
    let db = client.db();

    console.log('the current database is: ' + db.databaseName);
    let doc = await db.collection('app').findOne({ _id: appId });
    if (doc) {

      db.collection('app').updateOne({ _id: appId },
        { $set: { frequency: freq, url: appUrl, headers: headerArr } },
        { $upsert: true });

    } else {
      db.collection('app').insertOne({ _id: appId, frequency: freq, url: appUrl, headers: headerArr });
    }

  });
  res.sendFile(__dirname + '/index.html')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
