import mongoose from "mongoose";
const { Schema } = mongoose;

const destinationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  // Add other fields as necessary
});

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
