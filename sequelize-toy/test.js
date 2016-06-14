var Sequelize = require('sequelize');
var chai = require('chai');
var assert = chai.assert;
var Sequelize = require("sequelize");
var sequelize = new Sequelize("sqlite://", {dialect: "sqlite", logging: console.log});


describe("Test overridding of defaultValue.", function() {
  var User;

  before(function() {

    // Define a table that uses a custom default value
    User = sequelize.define('User', {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          defaultValue: sequelize.literal("uuid_generate_v1mc()"),
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          field: "first_name"
        },
    });

    // why doesn't setting these attributes override the default value
    // provided by User.create?
    User.attributes.id.defaultValue='b9c96442-2c0d-11e6-b67b-9e71128cae77';
    User.tableAttributes.id.defaultValue='b9c96442-2c0d-11e6-b67b-9e71128cae77';
    return sequelize.sync();
  });

  it('test seqeulize user add', function() {
    return User.create({
      name: 'paul',
    })
  });
});
