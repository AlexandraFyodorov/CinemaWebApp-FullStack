const express = require('express');
const USER_DB = require('../models/usersModel');
const usersBLL = require('../BLL/usersBLL');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Entry Point 'http://localhost:8080/users'

//Get all users
router.route('/').get(async (req, res) => {
    const users = await usersBLL.getAllUsers();
    res.json(users);
})
//Get user by username
router.route('/:username').get(async (req, res) => {
    const {username} = req.params;
    const user = await usersBLL.getUserByUsername(username);
    res.json(user);
})
//Sign up
router.route('/signup').post(async (req, res) => {
    const obj = req.body;
    const result = await usersBLL.signUp(obj)
    if(result===0)
    {
        return res.status(400).json({ message: 'Username is not exist in the data base!' });
    }
    if(result===1)
    {
        return res.status(400).json({ message: 'Sorry, that username is exist in the data base!' });
    }
    res.json(result);
})
//Sign In
router.route('/signin').post(async (req, res) => {
    debugger
    const {username,password} = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    try{
        const user = await usersBLL.getUserByUsername(username)
        if(!user)
        {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        if(password!==user.password)
        {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        else{
            const userID = { userId: user._id };
            const ACCESS_SECRET_TOKEN = 'secretkey';
            const sessionTimeout = user.sessionTimeOut;
            const expiration = Math.floor(Date.now() / 1000) + (sessionTimeout*60);
            const accessToken = jwt.sign({ id:userID }, ACCESS_SECRET_TOKEN,{expiresIn: expiration});
            res.json({ accessToken , expiration});
        }
    }catch (error) {
        return res.status(500).json({ message: 'System Admin need create new user for you' });
      }  
})
// Add new user
router.route('/').post(async (req, res) => {
    const obj = req.body;
    const result = await usersBLL.addUser(obj);
    res.json(result);
})
//Update user
router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const obj = req.body;
    const result = await usersBLL.updateMember(id, obj);
    res.json(result);
})
//Delete user
router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const result = await usersBLL.deleteUser(id);
    res.json(result);
})
module.exports = router;