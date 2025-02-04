import mongoose, { Document, Schema } from 'mongoose';

interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    authMethod: 'local' | 'google';
}

const userSchema = new Schema<UserDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    authMethod: { type: String, enum: ['local', 'google'], default: 'local' },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
