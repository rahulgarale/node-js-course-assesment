const fs=require('fs');

const users=[];

const createUser=(userName)=>{
    users.push(userName);
    
    fs.writeFile('user.txt',userName,(err)=>{
        console.log(users);
    });
}
const getUser=()=>{
    return users;
}
module.exports={
    create:createUser,
    get:getUser
};
