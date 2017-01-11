var express = require('express');
var reqrouter = express.Router();
var path = require('path');

var router = function () {

    reqrouter.route('/')
        .get(function (req, res) {
            res.sendFile(path.resolve('app/index.html'));
        });

    return reqrouter;
}

module.exports = router;