'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    tableName: 'items'
  });
  return Item;
};