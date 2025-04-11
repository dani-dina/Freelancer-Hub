import { Schema, model, Document } from "mongoose";

export interface IPayment extends Document {
  userId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  amount: number;
  method: "Stripe" | "PayPal";
  status: "pending" | "completed" | "failed";
}

const PaymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["Stripe", "PayPal"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
});

export const Payment = model<IPayment>("Payment", PaymentSchema);
