const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const reactionSchema = new Schema(
    {
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
        }

    },
{ 
    
        toJSON: { getters: true },
        toObject: { getters: true }
   
}
)
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;