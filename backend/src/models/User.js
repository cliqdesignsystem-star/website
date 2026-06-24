import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const profileSchema = new mongoose.Schema({
  fullName:       { type: String, default: '' },
  profession:     { type: String, default: '' },
  company:        { type: String, default: '' },
  intendedUse:    { type: String, default: '' },
  referralSource: { type: String, default: '' },
}, { _id: false })

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  plan: { type: String, enum: ['free', 'pro', 'pro+'], default: 'free' },
  profile: { type: profileSchema, default: () => ({}) },
  onboardingComplete: { type: Boolean, default: false },
}, { timestamps: true })

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password)
}

userSchema.methods.toSafeObject = function () {
  return {
    id: this._id,
    email: this.email,
    plan: this.plan,
    profile: this.profile,
    onboardingComplete: this.onboardingComplete,
    createdAt: this.createdAt,
  }
}

export default mongoose.model('User', userSchema)
