
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Todo = require('./lib/data');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname,"excelmodel"));
  app.use(express.static(path.join(__dirname, 'public')));

  // 设置本地测试时数据库连接地址
  app.set('mongourl', 'mongodb://localhost/simple_crud_dev');
});

// 链接本地数据库 
Todo.connect(app.get('mongourl'));

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/add',routes.todo_add);
app.get('/del/:id',routes.todo_del);
app.get('/detail/:id',routes.todo_detail);
app.post('/update/:id',routes.todo_update);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
