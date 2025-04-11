import { Schema, model, Document } from "mongoose";

export interface ISubscription extends Document {
  userId: Schema.Types.ObjectId;
  plan: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "inactive" | "cancelled";
}

const SubscriptionSchema = new Schema<ISubscription>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "inactive", "cancelled"], default: "active" },
});

export const Subscription = model<ISubscription>("Subscription", SubscriptionSchema);
