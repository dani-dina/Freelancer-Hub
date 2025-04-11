import { Schema, model, Document } from "mongoose";

export interface IPaymentMethod extends Document {
  userId: Schema.Types.ObjectId;
  type: "credit_card" | "debit_card" | "paypal";
  details: string;
}

const PaymentMethodSchema = new Schema<IPaymentMethod>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["credit_card", "debit_card", "paypal"], required: true },
  details: { type: String, required: true },
});

export const PaymentMethod = model<IPaymentMethod>("PaymentMethod", PaymentMethodSchema);
