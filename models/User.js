const { Schema, model } = require('mongoose');


// Schema to create a User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        trim: true,
        validate: {
            validator: async function (){
                if (this.username){
                    let dupCheck = await this.constructor.findOne({username: this.username})
                    return Boolean(!dupCheck);
                }
            },
            message: props => "That username is already being used. Please enter a new username."
        }
    },
    email: {
        type: String,
        required: true, 
        validate: {
            validator: async function (){
                const result = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).test(this.email);
                return Boolean(!result);
            },
            message: props => "That email entered is not valid. Please enter a valid email."
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },{
        toJSON: {
            virtuals: true,
        }
    }
);


//virtual property that gets the length of the user's friends array.
userSchema
    .virtual('friendCount')
    .get (function(){
        return this.friends.length;
    });

 
const User = model('user', userSchema);
module.exports = User;
