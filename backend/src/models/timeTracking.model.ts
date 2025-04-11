import { Schema, model, Document } from "mongoose";

export interface ITimeTracking extends Document {
  jobId: Schema.Types.ObjectId;
  freelancerId: Schema.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  totalHours: number;
}

const TimeTrackingSchema = new Schema<ITimeTracking>({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalHours: { type: Number, required: true },
});

export const TimeTracking = model<ITimeTracking>("TimeTracking", TimeTrackingSchema);
