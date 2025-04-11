import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  content: string;
  conversationId: Schema.Types.ObjectId;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: String,
  conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Message = model<IMessage>("Message", MessageSchema);
