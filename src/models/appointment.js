import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePagination from "mongoose-paginate-v2";

const appointmentSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    services: [{ type: Schema.Types.ObjectId, ref: "services" }],
    barber_id: { type: Schema.Types.ObjectId, ref: "barber" },
    client_id: { type: Schema.Types.ObjectId, ref: "client" },
    date: {
      type: Date,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  {
    collection: "appointment",
  }
);
appointmentSchema.plugin(mongoosePagination);

export default model("Appointment", appointmentSchema);
