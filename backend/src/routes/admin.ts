import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import { listPendingJobs, approveJob, revenueReport, auditLogs, gdprDeleteUser, runCrawlers } from '../controllers/adminController';

const router = express.Router();

router.get('/jobs/pending', authenticateToken, requireRole('admin'), listPendingJobs);
router.post('/jobs/:id/approve', authenticateToken, requireRole('admin'), approveJob);
router.get('/reports/revenue', authenticateToken, requireRole('admin'), revenueReport);
router.get('/audit', authenticateToken, requireRole('admin'), auditLogs);
router.delete('/gdpr/delete-user/:id', authenticateToken, requireRole('admin'), gdprDeleteUser);
router.post('/scrape/run', authenticateToken, requireRole('admin'), runCrawlers);

export default router;
