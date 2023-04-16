const User = require("../Models/User.model");
const HttpError = require("../support/http-error");

exports.getUserByNumber = async (req, res, next) => {
  try {
    const authUser = req.user;
    const phone_number = authUser.phone_number;
    console.log(req.body);
    if (!!!phone_number) {
      const err = new HttpError("invalid input", 401);
      return next(err);
    }
    const user = await User.findOne({ phone_number: phone_number });
    if (!user) {
      const err = new HttpError("user does not exist", 401);
      return next(err);
    }
    res.send({
      status: "succes",
      user: user,
    });
  } catch (error) {
    const err = new HttpError("Server Error", 500);
    return next(err);
  }
};

exports.addRate = async (req, res, next) => {
  try {
    const { rating, phone_number } = req.body;
    const targetUser = await User.findOne({ phone_number: phone_number });
    if (!targetUser) {
      const err = new HttpError("User undefined", 405);
      return next(err);
    }
    console.log( targetUser.rating);
    targetUser.rating.push(rating);
    await targetUser.save();
    res.send({ status: "succes", user: targetUser });
  } catch (error) {
    const err = new HttpError("Server Error", 500);
    return next(err);
  }
};

exports.getRate = async (req,res,next) => {
  try {
    const { phone_number } = req.body;
    const user = await User.findOne({ phone_number: phone_number });
    if (!user) {
      const err = new HttpError("User undefined", 405);
      return next(err);
    }
    const sum = user.rating.reduce((acc, curr) => acc + curr, 0);
    const rating  = sum/user.rating.length;
    res.send({status: "succes",
    rating: rating
})

  } catch (error) {
    const err = new HttpError("Server Error", 500);
    return next(err);
  }
};
