const { Thought, User, Reaction } = require('../models');

//all thoughts
module.exports ={
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // thought by id
    async getSingleThought(req, res) {
        console.log("Single Thought Route: ", req.params)
        try {
            const thought = await Thought.findOne({_id:req.params.thoughtId})
            .populate('reactions')
                .exec();

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that Id'})
            }
             res.status(200).json(thought);   
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //create new thoughts
    async createThoughts(req, res) {
        try {
            const { thoughtText, username, userId } = req.body;

            const newThought = new Thought({
                thoughtText,
                username,
                user: userId
            });

            const savedThought = await newThought.save();

            await User.findByIdAndUpdate(userId, {
                $push: { thoughts: savedThought._id }
            });

            res.status(201).json(savedThought);
        } catch (error) {
            res.status(500).json({ message: 'Error making thought', error });
        }
    },

    //delete thoughts
    async deleteThoughts(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.ThoughtId})

            if(!thought) {
                res.status(400).json({ message: 'No thought with that Id'})
            }
            
            const user = await User.findOneAndUpdate()

        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    async updateThoughts(req, res) {
        try{
            const thoughtId = req.params.thoughtId;
            const updateData = req.body;

            if (!thoughtId || !updateData) {
                return res.status(400).json({ message: 'Thought Id and update required' });
            }

            const updatedThought = await Thought.findByIdAndUpdate(thoughtId, updateData, {
                new: true,
                runValidators: true
            });

            if (!updatedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            res.status(200).json(updatedThought);
        } catch (error) {
            console.error('Error updating Thought:', error);
            res.status(500).json({ message: 'Error updating Thought', error });
        }

    },
     async addReaction (req, res)  {
        try {
            const thoughtId = req.params.thoughtId;
            const { reactionBody, username } = req.body;
             console.log(thoughtId,req.body);

            const newReaction = new Reaction({
                reactionBody,
                username,
                thought: thoughtId
            });
             console.log(newReaction);

            const savedReaction = await newReaction.save();

            await Thought.findByIdAndUpdate(thoughtId, {
                $push: { reactions: savedReaction._id }
            });
            console.log(savedReaction);

            res.status(201).json(savedReaction);
        } catch (error) {
            console.error('Error adding reaction');
            res.status(500).json({ message: 'Error adding reaction', error });
        }
    },

    //lets you remove a reaction from a thought
    async removeReaction (req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const { reactionId } = req.body;

            if (!thoughtId) {
                return res.status(400).json({ message: 'Thought required' });
            }

            const updatedThought = await Thought.findByIdAndUpdate(thoughtId,
                { $pull: { reactions: reactionId } },
                { new: true, runValidators: true }
            );

            res.status(200).json(updatedThought);
        } catch (error) {
            console.error('Error removing reaction');
            res.status(500).json({ message: 'Error removing reaction', error });
        }
    }};

