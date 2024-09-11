const {Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
    
        createdAt: {
            type: Date,
            default: Date.now,
        },
    

        username: {
            type: String,
            required: true,
        },
    
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User' },

        reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }]
    },
    {
        toJSON: { getters: true },
        toObject: { getters: true }
    }
);



thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

    thoughtSchema.set('toJSON', { virtuals: true });
    thoughtSchema.set('toObject', { virtuals: true });

const Thoughts = model('Thought', thoughtSchema)
module.exports = Thoughts;