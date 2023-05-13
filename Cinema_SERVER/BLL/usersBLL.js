const usersFile = require("../DAL/usersFile");
const permissionsFile = require("../DAL/permissionsFile");
const USER_DB = require("../models/usersModel");
const bcrypt = require("bcrypt");

//Get All users
const getAllUsers = async () => {
  const UsersDataToShow = [];
  //Get all data from DB
  const usersData = await USER_DB.find({}); //id+usernames+passwords
  //Get all data from users json file
  const { users: personsFile } = await usersFile.getUsers();
  //Get all data from permissions json file
  const { permissions: userPermissionsFile } = await permissionsFile.getPermissions();

  personsFile.forEach((per) => {
    const person = usersData.find((user) => user.id === per.id);
    const userPermissions = userPermissionsFile.find((p) => p.id === per.id);
    const obj = {
      id: person.id,
      role: person.role,
      username: person.username,
      firstName: per.firstName,
      lastName: per.lastName,
      sessionTimeOut: per.sessionTimeOut,
      createdData: per.createdData,
      permissions: userPermissions.permissions,
    };
    UsersDataToShow.push(obj);
  });
  return UsersDataToShow;
};
//Get User by username
const getUserByUsername = async (username) => {
  //Get all data from DB
  const usersData = await USER_DB.find({}); //id+usernames+passwords
  //Get all data from users json file
  const { users: personsFile } = await usersFile.getUsers();
  //Get all data from permissions json file
  const { permissions: userPermissionsFile } = await permissionsFile.getPermissions();

  const person = usersData.find((user) => user.username === username);
  const userPermissions = userPermissionsFile.find((p) => p.id === person.id);
  const personsDataFile = personsFile.find((p) => p.id === person.id);
  const obj = {
    id: person.id,
    role: person.role,
    password: person.password,
    username: username,
    firstName: personsDataFile.firstName,
    lastName: personsDataFile.lastName,
    sessionTimeOut: personsDataFile.sessionTimeOut,
    createdData: personsDataFile.createdData,
    permissions: userPermissions.permissions,
  };
  return obj;
};

// Signup - Post
const signUp = async (obj) => {
  const count = await USER_DB.countDocuments({});
  //const usersData = await USER_DB.find({})
  if (count === 0) {
    const userDB = {
      username: obj.username,
      password: obj.password,
      role: "admin",
    };
    const user = new USER_DB(userDB);
    await user.save();
    //---> pull data from DB to receive ID
    const data = await USER_DB.find({});
    const adminDB = data.find((per) => per.username === obj.username);

    //Create new user in json file (users) with id from DB
    const userJson = {
      id: adminDB._id,
      firstName: 'firstName to update', //string
      lastName: 'lastName to update', //string
      sessionTimeOut: 60, //number
      createdData: new Date().toLocaleDateString('en-CA'), //date format yyyy-mm-dd
    };
    //Create new Permissions in json file (permissions) with id from DB
    const permissionsJson = {
      id: adminDB._id,
      permissions: ['Create Subscriptions', 'Delete Subscriptions', 'Update Subscriptions', 'Create Movies', 'Delete Movies', 'Update Movies']
    };

    //save to usersFile == all users in json
    const { users } = await usersFile.getUsers();
    users.push(userJson);
    await usersFile.setUsers({ users });

    //save to permissionsFile
    const { permissions } = await permissionsFile.getPermissions();
    permissions.push(permissionsJson);
    await permissionsFile.setPermissions({ permissions });
    return "Admin created successfully";
  }
  else {
    const userDoc = await USER_DB.findOne({ username: obj.username });
    if (userDoc) {
      if (userDoc.password === '') {
        const user = await USER_DB.findOneAndUpdate(
          { username: obj.username },
          { $set: { password: obj.password } },
          { new: true }
        );
        if (user) {
          return "User created successfully";
        } else {
          return 0;
        }
      }
      else {
        return 1;
      }
    }
  }
  return 0;
};

// POST - Create new User
const addUser = async (obj) => {
  //Create user in DB with username and password
  const allData = await USER_DB.find({});
  const isAdmin = allData.find((per) => per.username === obj.username);
  if (isAdmin === undefined) {
    const userDB = {
      username: obj.username,
      password: "",
    };
    const newUserDB = new USER_DB(userDB);
    const savedUser = await newUserDB.save();
    const newUserId = savedUser._id;
  }

  //---> pull data from DB to receive ID
  const usersData = await USER_DB.find({});
  const personfromDB = usersData.find((per) => per.username === obj.username);

  //Create new user in json file (users) with id from DB
  const userJson = {
    id: personfromDB.id,
    firstName: obj.firstName, //string
    lastName: obj.lastName, //string
    sessionTimeOut: obj.sessionTimeOut, //number
    createdData: obj.createdData, //date format yyyy-mm-dd
  };
  //Create new Permissions in json file (permissions) with id from DB
  const permissionsJson = {
    id: personfromDB.id,
    permissions: obj.permissions,
  };

  //save to usersFile == all users in json
  const { users } = await usersFile.getUsers();
  users.push(userJson);
  await usersFile.setUsers({ users });

  //save to permissionsFile
  const { permissions } = await permissionsFile.getPermissions();
  permissions.push(permissionsJson);
  await permissionsFile.setPermissions({ permissions });
  return personfromDB.id
};

// PUT - Update User
const updateMember = async (id, obj) => {
  const userJson = {
    id: id,
    firstName: obj.firstName,
    lastName: obj.lastName,
    sessionTimeOut: obj.sessionTimeOut,
    createdData: obj.createdData,
  };
  const permissionsJson = {
    id: id,
    permissions: obj.permissions,
  };
  //Get all data from users json file
  const { users } = await usersFile.getUsers();

  //Get all data from permissions json file
  const { permissions } = await permissionsFile.getPermissions();

  const usersIndex = users.findIndex((u) => u.id === id);
  const permissionsIndex = permissions.findIndex((p) => p.id === id);

  if (usersIndex !== -1) {
    users[usersIndex] = userJson;
    await usersFile.setUsers({ users });
    permissions[permissionsIndex] = permissionsJson;
    await permissionsFile.setPermissions({ permissions });
    return "Update Done!";
  }
  return "Wrong ID";
};

// DELETE - Delete user from json files and DB
const deleteUser = async (id) => {
  //delete from db
  await USER_DB.findByIdAndDelete(id);

  //delete user from users json-file
  const { users } = await usersFile.getUsers();
  const indexUser = users.findIndex((user) => user.id === id);
  if (indexUser !== -1) {
    users.splice(indexUser, 1);
    const dataUser = { users };
    await usersFile.setUsers(dataUser);
  }

  //delete user from permissions json-file
  const { permissions } = await permissionsFile.getPermissions();
  const indexPermissions = permissions.findIndex((p) => p.id === id);
  if (indexPermissions !== -1) {
    permissions.splice(indexPermissions, 1);
    const dataPer = { permissions };
    await permissionsFile.setPermissions(dataPer);
  }
  return "User Deleted!";
};

module.exports = {
  getAllUsers,
  addUser,
  updateMember,
  deleteUser,
  signUp,
  getUserByUsername
};
