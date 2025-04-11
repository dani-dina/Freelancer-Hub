import { Schema, model, Document } from "mongoose";

export interface IReview extends Document {
  reviewerId: Schema.Types.ObjectId;
  reviewedId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

const ReviewSchema = new Schema<IReview>({
  reviewerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviewedId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
});

export const Review = model<IReview>("Review", ReviewSchema);
