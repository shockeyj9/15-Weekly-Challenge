const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
{   
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    reactionBody: {
        type: String,
        required: true,
        validate: {
            validator: async function (){
                if (!(this.reactionBody.length<=280)){
                    return true;
                }
            },
            message: props => "Thoughts must be between 1 and 280 character."
        }
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // TODO: ADD GETTER METHOD TO FORMAT THE TIMESTAMP ON QUERY
    },
})

const thoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: true,
            validate: {
                validator: async function (){
                    if (this.thoughtText.length<=280){
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
        reactions: [reactionSchema]
    },{
        toJSON: {
            virtuals: true,
            },
    }
)


const Thought = model('thought', thoughtSchema);
module.exports = Thought;