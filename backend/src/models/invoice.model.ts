import { Schema, model, Document } from "mongoose";

export interface IInvoice extends Document {
  paymentId: Schema.Types.ObjectId;
  amount: number;
  issuedTo: Schema.Types.ObjectId;
  issuedBy: Schema.Types.ObjectId;
  issuedAt: Date;
  dueDate: Date;
}

const InvoiceSchema = new Schema<IInvoice>({
  paymentId: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
  amount: { type: Number, required: true },
  issuedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
  issuedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  issuedAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
});

export const Invoice = model<IInvoice>("Invoice", InvoiceSchema);
