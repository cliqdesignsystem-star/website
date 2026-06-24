import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const validate = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return false
  }
  return true
}

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, plan: user.plan }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d',
  })

router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    if (!validate(req, res)) return
    try {
      const existing = await User.findOne({ email: req.body.email })
      if (existing) return res.status(409).json({ error: 'Email already in use' })
      const user = await User.create({ email: req.body.email, password: req.body.password })
      res.status(201).json({ token: signToken(user), user: user.toSafeObject() })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
)

router.post('/login',
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    if (!validate(req, res)) return
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user || !(await user.comparePassword(req.body.password))) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
      res.json({ token: signToken(user), user: user.toSafeObject() })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
)

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user: user.toSafeObject() })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/onboarding',
  requireAuth,
  body('fullName').optional().isString().trim(),
  body('profession').optional().isString().trim(),
  body('company').optional().isString().trim(),
  body('intendedUse').optional().isString().trim(),
  body('referralSource').optional().isString().trim(),
  async (req, res) => {
    if (!validate(req, res)) return
    try {
      const { fullName = '', profession = '', company = '', intendedUse = '', referralSource = '' } = req.body
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          profile: { fullName, profession, company, intendedUse, referralSource },
          onboardingComplete: true,
        },
        { new: true },
      )
      if (!user) return res.status(404).json({ error: 'User not found' })
      res.json({ user: user.toSafeObject() })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
)

router.post('/onboarding/skip', requireAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { onboardingComplete: true },
      { new: true },
    )
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user: user.toSafeObject() })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
