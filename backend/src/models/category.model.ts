import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
});

export const Category = model<ICategory>("Category", CategorySchema);
