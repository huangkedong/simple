var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// 主表集合
var todoSchema = new Schema({
	title:{type: String, requierd: true},			// 任务标题
	finish_time: {type: Number, defaults: 0},		// 任务完成时长 单位：小时
	create_date: {type:Date}						// 任务创建时间
});

var opened = false;

mongoose.connection.on('open', function(ref) {
	opened = true;
});
mongoose.connection.on('error', function(err) {
	opened = false;
});

exports.Todo = mongoose.model('Todo', todoSchema);
exports.connect = function(mongourl, options) {
	if ('undefined' === typeof options) {
		options = {
			server: {
				socketOptions: {
					keepAlive: 1
				}
			}
		};
	}
	mongoose.connect(mongourl, options);
};
exports.close = function() {
	mongoose.disconnect();
	opened = false;
};
exports.isOpen = function() {
	return opened;
};