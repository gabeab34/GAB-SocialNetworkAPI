import mongoose from "mongoose";
const {Schema, model, Types } = mongoose;

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get:strDate => new Date(strDate).toDateString()
    },
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
        id: false
});

const thoughtSchema = new Schema({
    thoughtText: {type: String,
               required: true,
               maxLength: 280
              },
    createdAt: {type: Date,
                default: Date.now,
                get:strDate => new Date(strDate).toDateString()
               },
    username: {type: String,
               required: true
              },
    reactions: [reactionSchema]           
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);



thoughtSchema.virtual("reactionCount").get(function ()
{ return this.reactions.length });

const Thought = model('thought', thoughtSchema);

export default Thought;