const express = require('express');
const app = express();

app.listen(8080, function(){
    console.log('listening on 8080')
});

app.get('/buty', function(요청, 응답){
    응답.send('미용 관련 페이지 입니다.');
});

app.get('/write', function(요청, 응답){
    응답.sendFile(__dirname + '/write.html');
});

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html');
}); 