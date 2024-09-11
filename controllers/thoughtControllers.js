const { Thought, User } = require('../models');

module.exports ={
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find()
            .populate('user');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        console.log("Single Thought Route: ", req.params)
        try {
            const thought = await Thought.findOne({_id:req.params.thoughtId})
            .populate('user')

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that Id'})
            }
             res.status(200).json(user)   
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThoughts(req, res) {
        try {
            const thought = await Thought.create(req.body);

        
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
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
            const thought = await Thought.findOneAndUpdate({_id: req.params.ThoughtId})

            if(!thought) {
                res.status(400).json({ message: 'There is no thought with that Id'})
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}   