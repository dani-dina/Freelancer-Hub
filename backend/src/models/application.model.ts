import mongoose,{Schema,model,Document} from 'mongoose';

interface IApplication extends Document {
    jobId: Schema.Types.ObjectId;
    freelancerId: Schema.Types.ObjectId;
    coverLetter: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: Date;
  }
  
  const ApplicationSchema = new Schema<IApplication>({
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: String,
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  });
  
  export const Application = model<IApplication>("Application", ApplicationSchema);
  