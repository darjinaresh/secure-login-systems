const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "user", // what kind of name u want to give, collection from mongodb
  }
);

userSchema.statics.register = async function (name, email, password) {
  try {
    // For validation Does email and password is valid or not...
    if (!validator.isEmail(email)) {
      throw new Error("invalid email format");
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      throw new Error(
        "Password id not strong enough. it must be atleast 8 charchter follwed by validator."
      );
    }

    // This logic is converting password into hased-password so that Our data can be protected from hacker
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const user = new this({
      name,
      email,
      password: hasedPassword,
    });

    const newUser = await user.save();
    return newUser;
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
};

userSchema.statics.getUser = async function (email) {
  try {
    const user = await this.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error getting user: " + error.message);
  }
};

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credintial");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid login credintial");
    }

    return user;
  } catch (error) {
    throw new Error("Error logging user: " + error.message);
  }
};

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
