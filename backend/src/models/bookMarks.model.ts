import { Schema, model, Document } from "mongoose";

export interface IBookmark extends Document {
  userId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  timestamp: Date;
}

const BookmarkSchema = new Schema<IBookmark>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Bookmark = model<IBookmark>("Bookmark", BookmarkSchema);
