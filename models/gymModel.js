const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A gym must have a name."]
  },
  address: {
    type: String,
    required: [true, "Please input the address of the gym."]
  },

  routes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Route"
    }
  ],
  imageURL: {
    type: String,
    required: [true, "Please send the URL to the gym image"]
  }
});

gymSchema.pre(/^find/, function(next) {
  this.populate({ path: "routes" });
  next();
});

const Gym = mongoose.model("Gym", gymSchema);
module.exports = Gym;
