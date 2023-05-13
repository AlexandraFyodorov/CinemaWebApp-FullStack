const membersDB = require('../models/membersModel');
//Get All
const getAllMembers = async () => {
  //Get all data from WS and save in DB
  return membersDB.find({});
}

// GET - Get By Id
const getMemberById = (id) => {
  return membersDB.findById({ _id: id });
};

// POST - Create in DB
const addMember = async (obj) => {
  const mem = new membersDB(obj);
  const savedMember = await mem.save();
  const newMemberId = savedMember._id;
  return newMemberId;
};

// PUT - Update
const updateMember = async (id, obj) => {
  await membersDB.findByIdAndUpdate(id, obj);
  return 'Member Updated!';
};

// DELETE - Delete
const deleteMember = async (id) => {
  await membersDB.findByIdAndDelete(id);
  return 'Member Deleted!';
};
module.exports = { getAllMembers, getMemberById, addMember, updateMember, deleteMember }