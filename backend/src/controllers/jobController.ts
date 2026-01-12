import { Request, Response } from "express";
import { Job } from "../models/Job";
import { Company } from "../models/Company";

// Basic create job
export async function createJob(req: Request, res: Response) {
  try {
    const { title, companyId, rawHtml, status, meta } = req.body;
    const job = await Job.create({ title, companyId, rawHtml, status: status || "draft", meta });
    return res.status(201).json(job);
  } catch (err) {
    return res.status(500).json({ error: "failed to create job", details: err });
  }
}

// Get job by id
export async function getJob(req: Request, res: Response) {
  try {
    const job = await Job.findById(req.params.id).lean();
    if (!job) return res.status(404).json({ error: "not found" });
    return res.json(job);
  } catch (err) {
    return res.status(500).json({ error: "failed to get job", details: err });
  }
}

// Update job
export async function updateJob(req: Request, res: Response) {
  try {
    const updates = req.body;
    const job = await Job.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true }).lean();
    if (!job) return res.status(404).json({ error: "not found" });
    return res.json(job);
  } catch (err) {
    return res.status(500).json({ error: "failed to update job", details: err });
  }
}

// Delete job
export async function deleteJob(req: Request, res: Response) {
  try {
    const job = await Job.findByIdAndDelete(req.params.id).lean();
    if (!job) return res.status(404).json({ error: "not found" });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "failed to delete job", details: err });
  }
}

// List jobs (simple)
export async function listJobs(req: Request, res: Response) {
  try {
    const q: any = {};
    if (req.query.status) q.status = req.query.status;
    const jobs = await Job.find(q).limit(100).lean();
    return res.json(jobs);
  } catch (err) {
    return res.status(500).json({ error: "failed to list jobs", details: err });
  }
}

// Simple ingestion endpoint: accept url/rawHtml and create company/job
export async function ingestJob(req: Request, res: Response) {
  try {
    const { url, rawHtml, company } = req.body;

    // naive parser stub: extract title from rawHtml <title> or from payload
    let title = req.body.title;
    if (!title && rawHtml) {
      const m = /<title>([^<]+)<\/title>/i.exec(rawHtml);
      if (m) title = m[1].trim();
    }

    // upsert company
    let companyDoc = null;
    if (company && company.name) {
      companyDoc = await Company.findOneAndUpdate({ name: company.name }, { $set: company }, { upsert: true, new: true });
    }

    const job = await Job.create({ title: title || "Untitled Job", companyId: companyDoc?._id, rawHtml: rawHtml || "", meta: { sourceUrl: url } });
    return res.status(201).json(job);
  } catch (err) {
    return res.status(500).json({ error: "ingest failed", details: err });
  }
}
