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
                .populate('friends')
                .exec();

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
   async addFriend (req, res)  {
        try {
            const userId = req.params.userId;
            console.log('User: ', userId);
            const friendId = req.params.friendId;
            console.log('Friend: ', friendId);

            if (!userId || !friendId) {
                return res.status(400).json({ message: 'User and friend required' });
            }

            const user = await User.findByIdAndUpdate(userId,
                { $push: { friends: friendId } },
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ meesage: 'Friend added', user: user });
        } catch (error) {
            console.error('Error adding friend');
            res.status(500).json({ message: 'Error adding friend', error });
        }
    },

    //lets you remove a friend from a user
   async removeFriend (req, res)  {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;

            if (!userId || !friendId) {
                return res.status(400).json({ message: 'User and friend required' });
            }

            const user = await User.findByIdAndUpdate(userId,
                { $pull: { friends: friendId } },
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found '});
            }

            res.status(200).json({ message: 'Friend removed', user: user });
        } catch (error) {
            console.error('Error removing friend');
            res.status(500).json({ message: 'Error removing friend', error });
        }
    }
};