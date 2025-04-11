import { Schema, model, Document } from "mongoose";

export interface IJobHistory extends Document {
  jobId: Schema.Types.ObjectId;
  freelancerId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  action: "posted" | "applied" | "accepted" | "completed";
  timestamp: Date;
}

const JobHistorySchema = new Schema<IJobHistory>({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, enum: ["posted", "applied", "accepted", "completed"], required: true },
  timestamp: { type: Date, default: Date.now },
});

export const JobHistory = model<IJobHistory>("JobHistory", JobHistorySchema);
