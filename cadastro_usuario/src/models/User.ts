import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  senha: string
  permissao: boolean
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  permissao: { type: Boolean, default: false },
})

 
const User = mongoose.models.User || mongoose.model('User', UserSchema); // Verifica se o modelo já existe

export default User
