let usernames = [
    'apple1234',
    'redhorse456',
    'lovely678',
    'turkey789',
    'chargers123',
    'texans0017',
    'loveyou69',
    'foodie77',
    'noodles321',
    'kingsland98',
  ]; 
   
  function getRandomUsername() {
  
      const newUsername = usernames[Math.floor(Math.random() * usernames.length )];
      console.log("Adding: ", newUsername);
      const continueData = usernames.filter(user => user !== newUsername);
      console.log("Remaining Data: ", continueData)
  
      usernames = continueData;
      
      return newUsername
    }
    
    
    let emails = [ 
      'apple@gmail.com',
      'redhorse@yahoo.com',
      'lovely@yahoo.com',
      'turkey@hotmail.com',
      'chargers@yahoo.com',
      'texans@gmail.com',
      'loveyou@yahoo.com',
      'foodie@outlook.com',
      'noodles@yahoo.com',
      'kings@gmail.com',
    ];
    
    function getRandomEmail(){ 
      
      const newEmail = emails[Math.floor(Math.random()*emails.length)]
      console.log("Adding: ", newEmail);
      const continueData = emails.filter(email => email !== newEmail);
      console.log("Remaining Data: ", continueData)
    
      emails = continueData;
      
      return newEmail
    }
    
  
  
  
  const randomUsername = getRandomUsername()
    const randomEmail = getRandomEmail()
    console.log(randomUsername);
    console.log(randomEmail)
  
    
    module.exports = {getRandomUsername, getRandomEmail, usernames, emails, }