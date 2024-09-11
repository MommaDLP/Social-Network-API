// const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate('thoughts');
           // console.log("Data: ", users);
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleUser(req, res) {

        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')

            if (!user) {
                return res.status(404).json({ message: 'No user with that Id' })
            }
            res.status(200).json(user)
        } catch (err) {
            console.log("Err: ", err);
            res.status(500).json(err)
        }
    },

    async createUsers(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteUsers(req, res) {
        console.log("Request: ", req.params);
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId})

            if(!user) {
                return res.status(404).json({ message: 'No user with that Id'})
            }

            await Thought.deleteMany({ _id: {$in: user.thought }});
            res.json({ message: 'User and Thoughts are deleted'})
        }catch (err) {
            res.status(500).json(err)
        }
    },
    
    async updateUsers(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $set: req.body},
                {runValidator: true, new: true}
            );
        if(!user) {
            res.status(404).json({message: 'no user with that Id'})
        }
        
        res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    }, 

};