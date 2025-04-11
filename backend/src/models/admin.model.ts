import mongoose ,{ Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin";
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

AdminSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        next();
    }
    
});
AdminSchema.pre<mongoose.Query<IAdmin, IAdmin>>("findOneAndUpdate", async function (next) {
    const update = this.getUpdate() as Partial<IAdmin>; // Ensure correct typing
  
    if (!update || !update.password) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
      next();
    } catch (error) {
      next();
    }
  });

export const Admin = model<IAdmin>("Admin", AdminSchema);
