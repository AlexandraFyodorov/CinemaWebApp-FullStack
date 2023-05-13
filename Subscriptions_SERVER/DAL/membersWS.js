const axios = require('axios');
const membersDB = require('../models/membersModel');
const getAllMembers =async () => {
    const { data: membersWeb } = await axios.get('https://jsonplaceholder.typicode.com/users');
    membersWeb.forEach(async (user) => {
        const obj = new membersDB({
            name: user.name,
            email: user.email,
            city: user.address.city
        });
        await obj.save();
    });

}
module.exports =  getAllMembers ;
