const { Schema, model } = require('mongoose') 

const userInfoSchema = new Schema({ 
    "email": String,
    "password": String,
});

const UserInfo = model('userInfos', userInfoSchema);

module.exports = UserInfo;