
/*
 * GET home page.
 */
"use strict";
var Todo = require('../lib/data').Todo;

exports.index = function(req, res){
  Todo.find({}).exec(function(err,docs){
    res.render('index', {docs:docs, title:"Express"})
  });

};

/*
 * todo add
 */
exports.todo_add = function(req, res){
  var todoData = new Todo(req.body.todo);
  todoData.create_date = new Date();
  console.log(todoData);
  Todo.create(todoData, function (err) {
    if(!err) {
      res.redirect('/');
    } else {
      res.send(404, '写入失败');
      res.redirect('/');
    }
  });
};

/*
 * todo del
 */
exports.todo_del = function(req, res){
  var id = req.params.id;
  var error = false;
  var msg = '';
  if(!id) {
    error = "warning";
    msg = '必须指定要删除的任务。';
  } else {
    Todo.remove({_id:id},function(err){
      if (err) {
        res.send(404, err.message);
      } else {
        res.redirect('/');
      }
    });
  }
};

/*
 * todo detail
 */
exports.todo_detail = function(req, res){
  var id = req.params.id;
  Todo.findById(id, function(err, docs){
    console.log(docs);
    res.render('detail', {docs:docs, title:"Express"})
  });
};

/*
 * todo update
 */
exports.todo_update = function(req, res){
  var id = req.params.id;
  var todoData = new Todo(req.body.todo);

  if(id){
    Todo.findByIdAndUpdate(id, 
      { 
        $set: { 
          title : todoData.title,
          finish_time : todoData.finish_time
        }
      }, 
      { upsert : true },
      function (err) {
        if (err){
          res.send(404, err.message);
        }else {
          res.redirect('/');
        }
      }
    );
  }


};

