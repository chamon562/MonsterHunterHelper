
'use strict';
const bcrypt = require('bcrypt')//now make hash function

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.weapon)
    }
  };
  // creating validation for name email and password
  user.init({
    // this whole thing is a obect in name
    name: {
      type: 
        DataTypes.STRING,
        // this is an object in itself
        validate:{
          //nested object
          len:{
            // wantd name to be lesser we can do 1 to 20 or watever number
            args: [1, 99],
            msg: 'Name must be 1 to 99 characters'
          }
        }
      
    },
    email: {
      type: 
        DataTypes.STRING,
        validate: {
          // isEmail is a sequelize syntax
          isEmail: {
            msg: 'Invalid email'
          }
        }
      
    },
    password: {
      type: 
        DataTypes.STRING,
        validate:{
          // length is len
          len: {
            args: [8, 99],
            msg: 'Password must be between 8 and 99 characters'
          }
        }
      
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  //need to use function because wwere going to be checkign this.password
  // function statys with in user here there will be creating
  // arrow function doesnt account for pending user
  user.addHook('beforeCreate', function(pendingUser){
    // initialize bcrypt up there 
    // pendinguser hash rang from 10 to 12 if more it will take longer like days longer
    // hash password for us  then need to replace user password with acutal hash
    let hash = bcrypt.hashSync(pendingUser.password, 12)
    // set password to the hash
    pendingUser.password = hash
  })
  // validPassword is method were making
  user.prototype.validPassword = function(passwordTyped){
    // comparesynce takes this.password and unhashing encrypting 
    // it and giving you back actual password and compare with 
    // password typed in and return boolean at the end
    let correctPassword = bcrypt.compareSync(passwordTyped, this.password)
    // return true or false based on correct password
    return correctPassword
  }

  // remove the password before it gets serialized (answer when used)
  user.prototype.toJSON = function(){
    //this which is the user then .get
    let userData = this.get()
    // method used to delete password
    delete userData.password
    return userData
  }
  return user;




  
};