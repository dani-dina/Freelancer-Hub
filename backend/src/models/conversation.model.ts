import { Schema, model, Document } from "mongoose";

export interface IConversation extends Document {
  members: Schema.Types.ObjectId[];
  lastMessage: string;
  lastUpdated: Date;
}

const ConversationSchema = new Schema<IConversation>({
  members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  lastMessage: String,
  lastUpdated: { type: Date, default: Date.now },
});

export const Conversation = model<IConversation>("Conversation", ConversationSchema);
