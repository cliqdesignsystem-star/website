import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import Project from '../models/Project.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

const LOGO_DIR = path.resolve('uploads/logos')
fs.mkdirSync(LOGO_DIR, { recursive: true })

const ALLOWED_MIME = new Set(['image/png', 'image/jpeg', 'image/svg+xml'])
const EXT_BY_MIME = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/svg+xml': '.svg' }

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, LOGO_DIR),
  filename: (req, file, cb) => {
    const ext = EXT_BY_MIME[file.mimetype] || path.extname(file.originalname)
    cb(null, `${req.params.id}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error('Only PNG, JPG, or SVG images allowed'))
    }
    cb(null, true)
  },
})

router.get('/', async (req, res) => {
  try {
    res.json(await Project.find({ userId: req.user.id }).sort('-updatedAt'))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const doc = await Project.findOne({ _id: req.params.id, userId: req.user.id })
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json(doc)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const doc = await Project.create({ userId: req.user.id, ...req.body })
    res.status(201).json(doc)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const doc = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true },
    )
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json(doc)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const doc = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/:id/logo', (req, res) => {
  upload.single('logo')(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    try {
      const project = await Project.findOne({ _id: req.params.id, userId: req.user.id })
      if (!project) {
        fs.unlinkSync(req.file.path)
        return res.status(404).json({ error: 'Project not found' })
      }
      const logoUrl = `/uploads/logos/${req.file.filename}`
      project.logoUrl = logoUrl
      await project.save()
      res.json({ logoUrl, project })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
})

export default router
