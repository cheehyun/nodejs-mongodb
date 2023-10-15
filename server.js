const express = require('express');
const app = express();

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://admin:cheehyun@cluster0.fmquuec.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')

  app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
  })

}).catch((err)=>{
  console.log(err)
})

app.get('/buty', function(요청, 응답){
    db.collection('post').insertOne({title : '어쩌구'})
    //응답.send('미용 관련 페이지 입니다.');
});

app.get('/write', function(요청, 응답){
    응답.sendFile(__dirname + '/write.html');
});

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html');
}); 