import { Request, Response } from 'express';
import { Job } from '../models/Job';
import { Source } from '../models/Source';
import { AuditLog } from '../models/AuditLog';
import { scrapeOnce } from '../services/playwrightScraper';
import { Snapshot } from '../models/Snapshot';
import { hashContent } from '../services/deltaDetector';

export async function listPendingJobs(_req: Request, res: Response) {
  const jobs = await Job.find({ status: 'pending' }).lean();
  res.json(jobs);
}

export async function approveJob(req: Request, res: Response) {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, { status: 'published' }, { new: true }).lean();
  if (!job) return res.status(404).json({ message: 'Not found' });
  await AuditLog.create({ actor: req.user?.email || 'system', action: 'approve_job', meta: { jobId: id } });
  res.json(job);
}

export async function revenueReport(_req: Request, res: Response) {
  // Simple demo metrics
  const totalJobs = await Job.countDocuments();
  const published = await Job.countDocuments({ status: 'published' });
  const draft = await Job.countDocuments({ status: 'draft' });
  // No billing model yet — return zeros
  res.json({ totalJobs, published, draft, totalRevenue: 0 });
}

export async function auditLogs(_req: Request, res: Response) {
  const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(200).lean();
  res.json(logs);
}

export async function gdprDeleteUser(req: Request, res: Response) {
  const { id } = req.params;
  // minimal deletion: remove user and related personal data (jobs/applications/referrals)
  const mongoose = require('mongoose');
  const User = mongoose.model('User');
  const Application = mongoose.model('Application');
  const Referral = mongoose.model('Referral');
  await User.findByIdAndDelete(id);
  await Application.deleteMany({ userId: id });
  await Referral.deleteMany({ userId: id });
  await AuditLog.create({ actor: req.user?.email || 'system', action: 'gdpr_delete', meta: { userId: id } });
  res.json({ ok: true });
}

export async function runCrawlers(req: Request, res: Response) {
  const sources = await Source.find({ enabled: true }).lean();
  const results: any[] = [];
  for (const s of sources) {
    try {
      const r: any = await scrapeOnce({ id: s._id?.toString(), url: s.url, selector: s.selector });
      // handle feed items if present
      if (r && Array.isArray(r.items)) {
        for (const item of r.items) {
          const url = item.url || item.link;
          const html = item.rawHtml || '';
          const h = hashContent(html);
          const existing = await Snapshot.findOne({ url }).lean();
          if (!existing || existing.hash !== h) {
            // post to ingest endpoint by creating Job directly for admin-run
            const job = await Job.create({ title: item.title || 'Ingested', rawHtml: html, meta: { sourceId: s._id, sourceUrl: url } });
            await Snapshot.findOneAndUpdate({ url }, { hash: h, lastSeen: new Date(), sourceId: s._id }, { upsert: true });
            results.push({ url, created: job._id });
          }
        }
      }
    } catch (e) {
      results.push({ source: s.url, error: String(e?.message || e) });
    }
  }
  await AuditLog.create({ actor: req.user?.email || 'system', action: 'run_crawlers', meta: { count: results.length } });
  res.json(results);
}
