import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
  userId: Schema.Types.ObjectId;
  type: "message" | "job_update" | "payment" | "review";
  message: string;
  read: boolean;
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["message", "job_update", "payment", "review"], required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
});

export const Notification = model<INotification>("Notification", NotificationSchema);
