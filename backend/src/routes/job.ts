import { Router } from "express";
import { createJob, getJob, listJobs, ingestJob, updateJob, deleteJob } from "../controllers/jobController";

const router = Router();

router.post("/", createJob);
router.get("/", listJobs);
router.get("/:id", getJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);
router.post("/ingest", ingestJob);

export default router;
