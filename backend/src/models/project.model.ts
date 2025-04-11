import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  clientId: Schema.Types.ObjectId;
  title: string;
  description: string;
  budget: number;
  status: "active" | "completed" | "on-hold";
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  budget: Number,
  status: { type: String, enum: ["active", "completed", "on-hold"], default: "active" },
  createdAt: { type: Date, default: Date.now },
});

export const Project = model<IProject>("Project", ProjectSchema);
