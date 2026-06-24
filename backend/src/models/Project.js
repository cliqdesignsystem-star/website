import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, default: 'Untitled Project' },
  templateId: { type: String, default: 'minimal' },
  logoUrl: { type: String, default: '' },
  system: { type: mongoose.Schema.Types.Mixed, default: null },
  designSystemId: { type: mongoose.Schema.Types.ObjectId, ref: 'DesignSystem' },
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)
