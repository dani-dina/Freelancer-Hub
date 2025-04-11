import mongoose,{Schema,Document,model} from "mongoose";

interface IJob extends Document {
    title: string;
    description: string;
    category: string;
    budget: number;
    clientId: Schema.Types.ObjectId;
    status: "open" | "in-progress" | "completed" | "closed";
    applicants: Schema.Types.ObjectId[];
    createdAt: Date;
  }
  
  const JobSchema = new Schema<IJob>({
    title: { type: String, required: true },
    description: String,
    category: String,
    budget: Number,
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["open", "in-progress", "completed", "closed"], default: "open" },
    applicants: [{ type: Schema.Types.ObjectId, ref: "Application" }],
    createdAt: { type: Date, default: Date.now },
  });
  
  export const Job = model<IJob>("Job", JobSchema);
  