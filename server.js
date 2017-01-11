var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT;

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

var entities = require('./entities.js');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var apirouter = require('./src/routes/apiroutes')();
app.use('/api', apirouter);

var reqRouter = require('./src/routes/reqroutes')();
app.use('/', reqRouter);

app.use(express.static('app'));

entities.sequelize.sync().then(function() {
    app.listen(port, function(err) {
        if (err) console.log(err);

        console.log('running server on port ' + port);
    });

})
