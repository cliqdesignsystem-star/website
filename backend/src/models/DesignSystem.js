import mongoose from 'mongoose'

const designSystemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, default: 'My Design System' },
  isDefault: { type: Boolean, default: false },
  system: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true })

export default mongoose.model('DesignSystem', designSystemSchema)
