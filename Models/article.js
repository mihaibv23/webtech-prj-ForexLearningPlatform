/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('article', {
		articleId: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		categoryId: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			references: {
				model: 'category',
				key: 'categoryId'
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'article'
	});
};
