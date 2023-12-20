import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePagination from "mongoose-paginate-v2";

const clientSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: String,
    age: Number,
    address: String,
  },
  {
    collection: "client",
  }
);
clientSchema.plugin(mongoosePagination);
export default model("client", clientSchema);
