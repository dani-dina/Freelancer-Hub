import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "client" | "developer";
  profile: {
    bio?: string;
    skills?: string[];
    rating: number;
    reviewsCount: number;
  };
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "developer"], required: true },
  profile: {
    bio: String,
    skills: [String],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save',async function (next) {
  if(!this.isModified('password')) return next();
  try{
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password,salt);
      next();
  }catch(error){
      next();
  }
})

UserSchema.pre<mongoose.Query<IUser,IUser>>('findOneAndUpdate',async function (next) {
     const update = this.getUpdate() as Partial<IUser>;
     if(!update || !update.password) return next();

     try{
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password,salt);
        this.setUpdate(update);
        next();
     }catch(error){
        next();
     }
})
const User = model<IUser>("User", UserSchema);

export default User;
