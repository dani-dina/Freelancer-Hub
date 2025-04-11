import { Schema, model, Document } from "mongoose";

export interface ITax extends Document {
  userId: Schema.Types.ObjectId;
  amount: number;
  taxRate: number;
  totalTax: number;
  createdAt: Date;
}

const TaxSchema = new Schema<ITax>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  taxRate: { type: Number, required: true },
  totalTax: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Tax = model<ITax>("Tax", TaxSchema);
