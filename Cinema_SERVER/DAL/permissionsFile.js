const jsonFile = require('jsonfile');
const file = './data/permissions.json';
//Read from a json File
const getPermissions = ()=>{
    return jsonFile.readFile(file);
};
//Write to a json File
const setPermissions = async(obj)=>{
await jsonFile.writeFile(file,obj);
return 'Done'
};

module.exports={getPermissions, setPermissions};