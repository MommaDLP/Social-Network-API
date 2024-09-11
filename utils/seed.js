const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

//makes user seeds
const users = [
    { username: 'apple1234', email:'apple@gmail.com' },
    { username: 'redhorse456', email: 'redhorse@yahoo.com' },
    { username: 'lovely678' , email: 'lovely@yahoo.com' },
    { username: 'turkey789', email:  'turkey@hotmail.com' },
    { username: 'chargers123', email: 'chargers@yahoo.com' },
    { username: 'texans0017', email:'texans@gmail.com'},
    { username: 'loveyou69', email: 'loveyou@yahoo.com'},
    { username: 'foodie77', email: 'foodie@outlook.com'}
];

//sets up mongo database and seeds it by removing data if it exist and putting new data in
const MONGO_URI = 'mongodb://localhost:27017/socialNetworkDB';

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await User.deleteMany({});
        await Thought.deleteMany({});

        await User.insertMany(users);
        console.log('User seed worked!');
        
    } catch (error) {
        console.error('Seed failed...', error);
    } finally {
        await mongoose.connection.close();
    }
};

//actually runs the seed function
seedDB();
    