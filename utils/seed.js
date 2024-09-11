const connection = require('../config/connection');
const { Thought, User} =require('../models');
const { getRandomEmail, email, getRandomUsername, usernames} =require('./data')
console.log(getRandomEmail)
console.log(getRandomUsername)

connection.on('error', (err) => err);

connection.once('open', async () => {
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts'}).toArray()
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db.listCollections({ name: 'users'}).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }


    const users = [];

    for (let i = 0; i < usernames.length; i++) {
     
        const username = getRandomUsername();
        const email = getRandomEmail();

        users.push({
            username,
            email,

        })
    }
    console.log("User Array: ", users);

    await User.insertMany(users);
    console.table(users)

    process.exit(0);
});
  
    