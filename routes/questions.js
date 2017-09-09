var db = require('../database-config/mongodb.js');

exports.addQuestion = function (req, res) {
    var data = {};
    console.log(req.body);
    var questions = new db.questionsModel(req.body);
    questions.save(function (err, success) {
        if (success) {
            console.log(success);
            data.status = 201;
            res.json(data);
        }
        else {
            console.log("failure");
            data.status = 403;
            res.json(data);
        }
    });
};

exports.getQuestions = function (req, res) {
    var data = {};
    db.questionsModel.find({}, { _id: 0, description: 0, team: 0 }, function (err, success) {
        if (success) {
            console.log(success);
            data.questions = success;
            data.status = 201;
            res.json(data);
        } else {
            data.status = 401;
            res.json(data);
        }
    }).sort({ _id: -1 });
};