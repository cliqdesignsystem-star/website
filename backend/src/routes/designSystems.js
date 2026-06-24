import { Router } from 'express'
import DesignSystem from '../models/DesignSystem.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

router.get('/', async (req, res) => {
  try {
    const systems = await DesignSystem.find({ userId: req.user.id }).sort('-updatedAt')
    res.json(systems)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, system, isDefault } = req.body
    if (isDefault) {
      await DesignSystem.updateMany({ userId: req.user.id }, { isDefault: false })
    }
    const doc = await DesignSystem.create({ userId: req.user.id, name, system, isDefault: !!isDefault })
    res.status(201).json(doc)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const doc = await DesignSystem.findOne({ _id: req.params.id, userId: req.user.id })
    if (!doc) return res.status(404).json({ error: 'Not found' })
    const { name, system, isDefault } = req.body
    if (isDefault) {
      await DesignSystem.updateMany({ userId: req.user.id }, { isDefault: false })
    }
    Object.assign(doc, { name, system, isDefault: !!isDefault })
    await doc.save()
    res.json(doc)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const doc = await DesignSystem.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
