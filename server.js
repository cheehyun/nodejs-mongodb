const express = require('express')
const app = express();
const { MongoClient, ObjectId} = require('mongodb')

app.use(express.static(__dirname + "/public"))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true})) 




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


//하나의 API
app.get('/write', (요청, 응답) => { //'/write'로 get, delete, post 요청을 날리면
  응답.render('write.ejs')//이 코드 실행
});


//중요
//서버 데이터를 ejs 파일에 넣으려면
//1. ejs 파일로 데이터 전송
//2. ejs 파일 안에 <%=데이터 이름%>
app.get('/list', async(요청, 응답) => {
  let result = await db.collection('post').find().toArray()
  응답.render('list.ejs', { posts : result})
});


app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html'); 
}); 


//시간 전송 페이지 만들기 (복습용) 
app.get('/time', async(요청, 응답) => {
  let time = await new Date()
  응답.render('time.ejs', { time : time})
});


//html 'form'태그 --> post로 받기
app.post('/url', async(요청, 응답) => {
  try{
    if(요청.body.title == "" || 요청.body.content == ""){
      응답.redirect('/write')
    }else{
      await db.collection('post').insertOne({title : 요청.body.title, content : 요청.body.content})
      응답.redirect('/list')
    }
  }catch(e){
    console.log(e)
  }
})

app.get('/detail/:L', async(요청, 응답) => {
  
  // await db.collection('post').findOne({ _id : new ObjectId ('652b8b1a9f40a556a8fa75fa')})
  응답.render('detail.ejs', {})
  console.log(요청.params)
})