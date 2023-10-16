const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"))
app.set('view engine', 'ejs')


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

app.get('/write', function(요청, 응답){
    응답.sendFile(__dirname + '/write.html');
});


//중요
app.get('/list', async(요청, 응답) => {
  let result = await db.collection('post').find().toArray()
  응답.render('list.ejs', { posts : result})
});
//서버 데이터를 ejs 파일에 넣으려면
//1. ejs 파일로 데이터 전송
//2. ejs 파일 안에 <%=데이터 이름%>


app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html'); 
}); 

app.get('/time', async(요청, 응답) => {
  let time = await new Date()
  응답.render('time.ejs', { time : time})
});