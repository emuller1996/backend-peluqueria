import pkg from 'mongoose';
const { Schema, model } = pkg;

const barberSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    image: String,
    name: String,
    services: [{ type: Schema.Types.ObjectId, ref: "services" }],
    role: String,
  },
  {
    collection: "barber",
    timestamps: true,
  }
);
export default model("barber", barberSchema);
