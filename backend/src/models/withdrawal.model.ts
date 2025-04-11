import { Schema, model, Document } from "mongoose";

export interface IWithdrawal extends Document {
  freelancerId: Schema.Types.ObjectId;
  amount: number;
  method: "Bank Transfer" | "PayPal" | "Stripe";
  status: "pending" | "processed" | "failed";
}

const WithdrawalSchema = new Schema<IWithdrawal>({
  freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["Bank Transfer", "PayPal", "Stripe"], required: true },
  status: { type: String, enum: ["pending", "processed", "failed"], default: "pending" },
});

export const Withdrawal = model<IWithdrawal>("Withdrawal", WithdrawalSchema);
