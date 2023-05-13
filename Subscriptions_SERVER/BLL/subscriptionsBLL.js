const subscriptionsDB = require('../models/subscriptionsModel');

//Get All
const getAllSubscriptions = () => {
  return subscriptionsDB.find({});
}
// GET - Get By Id
const getSubscriptionById = (id) => {
  return subscriptionsDB.findById({ _id: id });
};
// POST - Create in DB
const addSubscription = async (obj) => {
  const allSubscriptions = await subscriptionsDB.find({});
  const subscription  = allSubscriptions.find((item) => item.memberId === obj.memberId);
  if (!subscription ) {
    const sub = new subscriptionsDB(obj);
    const newSub = await sub.save();
    return newSub;
  }
  else {
    const newMovie = {
      movieId: obj.movies.movieId,
      date: obj.movies.date
    }
    subscription.movies.push(newMovie);
    const sub = await subscription.save();
    return sub
  }

};
// PUT - Update movie subsriptions
const updateSubscription = async (id, obj) => {
  const allSubscriptions = await subscriptionsDB.find({});
  allSubscriptions.map(async (sub)=>{
    await subscriptionsDB.updateOne({memberId:sub.memberId}, { $pull: { movies: { movieId: id } } })
  })
  return 'Subscription Updated!';
};
// DELETE - Delete
const deleteSubscription = async (id) => {
  const allSubscriptions = await subscriptionsDB.find({});
  const subscription  = allSubscriptions.find((item) => item.memberId === id);
  await subscriptionsDB.findByIdAndDelete(subscription._id);
  return 'Vubscription Deleted!';
};
module.exports = { getAllSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription }