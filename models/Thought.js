const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

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
        get: (date)=> `${dayjs(date).format('MMM Do, YYYY [at] hh:mm A')}`
    },
},{
    toJSON: {
        getters: true,
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
            get: (date)=> `${dayjs(date).format('MMM Do, YYYY [at] hh:mm A')}`
        },
        username: {
            type: String,
            require: true
        },
        reactions: [reactionSchema]
    },{
        toJSON: {
            getters: true,
            virtuals: true,
            },
    }
)


const Thought = model('thought', thoughtSchema);
module.exports = Thought;