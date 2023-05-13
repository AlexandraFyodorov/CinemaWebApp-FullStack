const jsonFile = require('jsonfile');
const file = './data/users.json';
//Read from a json File
const getUsers = ()=>{
    return jsonFile.readFile(file);
};
//Write to a json File
const setUsers = async(obj)=>{
await jsonFile.writeFile(file,obj);
return 'Done'
};

module.exports={getUsers, setUsers};