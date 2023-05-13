const express = require('express');
const membersBLL = require('../BLL/membersBLL');

const router = express.Router();

//Entry Point 'http://localhost:8000/members'

//Get all members
router.route('/').get(async(req,res)=>{
    const member = await membersBLL.getAllMembers();
    res.json(member);
});

//Get member by id
router.route('/:id').get(async(req,res)=>{
    const {id} = req.params;
    const member = await membersBLL.getMemberById(id);
    res.json(member);
})

//Add member
router.route('/').post(async(req,res)=>{
    const obj = req.body;
    const result = await membersBLL.addMember(obj);
    res.json(result);
})

//Update member
router.route('/:id').put(async(req,res)=>{
    const {id} = req.params;
    const obj = req.body;
    const result = await membersBLL.updateMember(id,obj);
    res.json(result);
})

//Delete member
router.route('/:id').delete(async(req,res)=>{
    const {id} = req.params;
    const result = await membersBLL.deleteMember(id);
    res.json(result);
})
module.exports = router;