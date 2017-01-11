var express = require('express');
var apirouter = express.Router();
var bodyParser = require('body-parser');
var entities = require('./../../entities.js');
var async = require('async');

var router = function() {

    apirouter.route('/')
        .get(function(req, res) {
            res.send("Hi");
        });

    apirouter.route('/getallcategories')
        .get(function(req, res) {
            entities.category.findAll()
                .then(function(success) {

                        res.status(200).send({
                            success
                        });
                    },
                    function(reject) {
                        console.log(reject);
                    }).catch(function(err) {
                    console.log(err);
                });
        });

    apirouter.route('/getarticlesbycategory')
        .get(function(req, res) {

            entities.article.findAll({
                    where: {
                        categoryId: req.query.catid
                    }
                })
                .then(function(success) {
                        res.status(200).send({
                            articles: success
                        });
                    },
                    function(reject) {
                        console.log(reject);
                    }).catch(function(err) {
                    console.log(err);
                });

        });

    apirouter.route('/getcommentbyarticle')
        .get(function(req, res) {

            entities.comment.findAll({
                    where: {
                        articleId: req.query.articleid
                    }
                })
                .then(function(success) {
                        res.status(200).send({
                            comments: success
                        });
                    },
                    function(reject) {
                        console.log(reject);
                    }).catch(function(err) {
                    console.log(err);
                });

        });

    apirouter.route('/postcomment')
        .post(function(req, res) {

            var cmnt = entities.comment.build({
                articleId: req.body.articleId,
                user: req.body.user,
                date: getDateTime(),
                email: req.body.email,
                content: req.body.content,
                createdAt: getDateTime(),
                updatedAt: getDateTime()
            });

            cmnt.save().then(function(response) {
                    res.status(200).send({
                        comment: response
                    })
                },
                function(reject) {
                    console.log(reject)
                }).catch(function(err) {
                console.log(err)
            }).done();

        });

    apirouter.route('/putcomment')
        .post(function(req, res) {

            entities.comment.find({
                    where: {
                        commentId: req.body.commentId
                    }
                })
                .then(function(resolve) {
                    resolve.updateAttributes({
                        user: req.body.user,
                        content: req.body.content,
                        email: req.body.email,
                        updatedAt: getDateTime()
                    }).then(function(rslv) {
                        res.status(200).send(rslv);
                    }, function(rjct) {
                        console.log(rjct);
                    });
                }, function(reject) {

                });

        });

    apirouter.route('/deletecomment')
        .delete(function(req, res) {
            entities.comment.find({
                    where: {
                        commentId: req.query.commentid
                    }
                })
                .then(function(data) {
                    data.destroy()
                        .then(function(rslv) {
                            res.status(200).send(rslv);
                        }, function(rjct) {
                            console.log(rjct);
                        });
                }, function(reject) {

                });

        });



    function getDateTime() {

        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

    }

    return apirouter;
};

module.exports = router;
