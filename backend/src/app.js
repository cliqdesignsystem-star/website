import express from 'express'
import cors from 'cors'
import path from 'path'
import authRoutes from './routes/auth.js'
import designSystemRoutes from './routes/designSystems.js'
import projectRoutes from './routes/projects.js'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }))
app.use(express.json({ limit: '2mb' }))

app.use('/uploads', express.static(path.resolve('uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/design-systems', designSystemRoutes)
app.use('/api/projects', projectRoutes)

app.get('/api/health', (_, res) => res.json({ ok: true }))

export default app
