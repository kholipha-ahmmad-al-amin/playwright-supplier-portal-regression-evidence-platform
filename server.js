const express = require('express')
const app = express()
app.use(express.json())
const documents = []
const requireRole = (role, res) => { if (res.req.header('x-role') !== role) { res.status(403).json({ error: 'FORBIDDEN' }); return false } return true }
app.get('/health', (_req, res) => res.json({ service: 'playwright-supplier-portal', status: 'healthy' }))
app.get('/', (_req, res) => res.type('html').send('<main><h1>Supplier Portal</h1><p>Regression evidence workspace</p></main>'))
app.post('/api/documents', (req, res) => { if (!requireRole('supplier-owner', res)) return; if (!req.body?.name || req.body.name.length < 4) return res.status(400).json({ error: 'VALIDATION' }); const item = { id: String(documents.length + 1), name: req.body.name, status: 'submitted' }; documents.push(item); res.status(201).json(item) })
app.post('/api/documents/:id/approve', (req, res) => { if (!requireRole('compliance-manager', res)) return; const item = documents.find(x => x.id === req.params.id); if (!item) return res.status(404).json({ error: 'NOT_FOUND' }); if (item.status !== 'submitted') return res.status(409).json({ error: 'CONFLICT' }); item.status = 'approved'; res.json(item) })
if (require.main === module) app.listen(process.env.PORT || 14100, '0.0.0.0')
module.exports = app
