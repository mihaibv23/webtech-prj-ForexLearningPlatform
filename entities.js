var Sequelize = require('sequelize');
var sequelize = new Sequelize('articlesdb','darpanpathak','');

/*var sequelize = new Sequelize('nextmetest','nextme','dpn123',{
   host:"bamboo.arvixe.com",
   port:3306,
   dialect: 'mysql'
});*/

var entities = {};

entities.category = sequelize.import('./Models/category.js');
entities.article = sequelize.import('./Models/article.js');
entities.comment = sequelize.import('./Models/comment.js');
entities.sequelize = sequelize;
entities.Sequelize = Sequelize;

module.exports = entities;