const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: true, 
            validate: {
                validator: async function (){
                    if (!(1<=this.thoughtText.length<=280)){
                        return true;
                    }
                },
                message: props => "Thoughts must be between 1 and 280 character."
            }
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: ADD GETTER METHOD TO FORMAT THE TIMESTAMP ON QUERY
        },
        username: {
            type: String,
            required: true, 
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction',
            },
        ]
    },{
        toJSON: {
            virtuals: true,
            },
    }
)


const Thought = model('user', thoughtSchema);
module.exports = Thought;