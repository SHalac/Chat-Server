var mongoose = require('mongoose');
vat bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;
var db = 'mongodb://halacselim:Jimmer36@ds011883.mlab.com:11883/trumpetdb';
mongoose.connect(db);

// to use our schema, we need to convert our schema into a model.
// pass it to mongoose.model(modelName, schema);
//instance of a model is a document
// QUERY FOR DOCUMENTS by using models find, findById, findOne or where


//*************************************************
//  DEFINE DATA TYPES AND SCHEMAS/MODELS HERE
//*************************************************
var conversationMessageSchema = new schema({
message: String
});

var conversationMessage = mongoose.model('conversationMessage',conversationMessageSchema);

var conversationSchema = new Schema({
persons: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'conversationMessage']
});
var conversation = mongoose.model('conversation',conversationSchema);

var userSchema = new Schema ({
//make sure youve added everything to schema before calling model
name: String,
email: {
	type: String,
	required: true,
	unique: true
}
username: String,
password: String,
status: String,
friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

UserSchema.pre('save', function(next) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
        		bcrypt.hash(this.password,salt,function(err,hash){
        			this.password = hash;
        			console.log("saving and hashing a pwd");
        			next();
        		});
        });                                                                                                                                                                  
});  
var newUser = mongoose.model('newUser',UserSchema);

//*********************************************************
// DEFINE DATABASE FUNCTIONS FOR MANAGING USERS
// ********************************************************

// Adds a new user to the database
var addNew = function addNew(newName,newEmail,newUsername,newPassword){
	var makeNew = new newUser({
		name: newName, 
		email: newEmail, 
		username: newUsername,
		password: newPassword
	});
}
// logs in a user
var login = function login(){

}
// checks if the given email is already registered with the system.
var checkDuplicateEmail = function checkDuplicateEmail(Textemail){
	var dupcount = 0;
	newUser.count({email: Textemail}, function(err,count){
			dupcount = count;
	});
	if(dupcount>0){
		return true;
	}
	return false;
}
// checks if the given userName is already in use.
var checkDuplicateUserName = function checkDuplicateUserName(TextuserName){
	var dupcount = 0;
	newUser.count({username: TextuserName}, function(err,count){
			dupcount = count;
	});
	if(dupcount>0){
		return true;
	}
	return false;
}
//********************************************
// PUT EXPORTS HERE
//*********************************************
module.exports = {
	newUser: newUser,
	checkDuplicateEmail: checkDuplicateEmail,
	checkDuplicateUserName: checkDuplicateUserName,
	addNew: addNew
};
// mongoose.model("users").find(.......)