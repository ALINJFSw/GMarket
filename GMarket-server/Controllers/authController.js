const User = require("../Models/User.module");
const HttpError = require("../support/http-error");
const Verification = require("../Models/Verification");
exports.sendVerificationCodeSMS = async (req, res, next) => {
  const { phone_number } = req.body;
  const verificationCode = Math.floor(Math.random() * 9000 + 1000);
  console.log(verificationCode);
  const message =
    "to verifiy your number this is the verification Code " + verificationCode;

  try {
    const client = require("twilio")(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    client.messages
      .create({
        body: message,
        from: "+16203776088",
        to: "+"+phone_number,
      })
      .then((message) => {
        
        res.send("message sent");
      })
      .catch((error) => {
        const err = new HttpError(error.message, 405);
        return next(err);
      });
    const verificationExist = await Verification.findOne({
      phone_number: phone_number,
    });
    if (verificationExist) {
      verificationExist.verification_code = verificationCode;
      await verificationExist.save();
      res.send({ status: "succes", message: "code resended" });
      return;
    }
    console.log("teset");
    const verification = new Verification();
    verification.phone_number = phone_number;
    verification.verification_code = verificationCode;
    verification.save();

    res.send(verification);
  } catch (error) {
    const err = new HttpError("Server Error try again later", 405);
    next(err);
  }
};

exports.confirmVerificationCode = async (req, res, next) => {
  try {
    const { code, phone_number } = req.body;
    const number = await Verification.findOne({ phone_number: phone_number });
    if (!number) {
      const err = new HttpError(
        "somthing wen't wrong please try again later",
        401
      );
      return next(err);
    }
    if (code != number.verification_code) {
      const err = new HttpError("Invalid Code", 401);
      return next(err);
    }
    res.send({ status: "succes" });
  } catch (error) {
    const err = new HttpError("server error", 401);
    return next(err);
  }
};

const inputVerify = (input, type) => {
    if(type = 'name'){
        if(input.length <= 0){
            return false
        }
        else return true
    }
    else if(type == "email"){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
        const emailIsValid = !!input.match(emailRegex);
        if (emailIsValid) {
            return true
        }
        else return false;
    }
    else if(type == "phone"){
        const phoneRegex = /^[0-9]+$/;
        if (!!input.match(phoneRegex)) {
            return true
        }
        else return false;
    }
    else if(type == "type"){
        if (input == "farmer" || input == "customer") {
            return true;
        }
        else {
            return false
        }
    }
    else return false;
}

exports.register = async() => {
    const {first_name, last_name,email,phone_number,type,image, bio} = req.body;
    const first_name_valid = inputVerify(first_name,"name")
    const last_name_valid = inputVerify(last_name,"name");
    const email_valid = inputVerify(email,"email");
    const phone_valid = inputVerify(email,"phone");
    const type_valid = inputVerify(email,"type");
    if(first_name_valid && last_name_valid && email_valid && phone_valid && type_valid){
        console.log("validated succefulyy");
    }
    else {
        
    }
}
