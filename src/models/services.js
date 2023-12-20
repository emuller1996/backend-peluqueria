import mongoose from "mongoose";
const { Schema, model } = mongoose;

const servicesSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    image: String,
  },
  {
    collection: "services",
  }
);
export default model("services", servicesSchema);
