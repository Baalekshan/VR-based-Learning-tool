import mongoose, { Document, Schema } from 'mongoose';

export interface UserSessionDocument extends Document {
    userId: mongoose.Types.ObjectId;
    sessionId: string;
    lastActive: Date;
    ipAddress: string;
    userAgent: string;
}

const userSessionSchema = new Schema<UserSessionDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sessionId: { type: String, required: true },
    lastActive: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true }
});

// Index for faster queries
userSessionSchema.index({ userId: 1, sessionId: 1 }, { unique: true });
userSessionSchema.index({ lastActive: 1 }, { expireAfterSeconds: 24 * 60 * 60 }); // Auto-delete after 24 hours

const UserSession = mongoose.model<UserSessionDocument>('UserSession', userSessionSchema);
export default UserSession; 