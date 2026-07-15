import mongoose, { Document, Schema } from "mongoose";

export interface ISlot extends Document {
  date: Date;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
}

const slotSchema = new Schema<ISlot>(
  {
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    bookedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model<ISlot>("Slot", slotSchema);

export default Slot;