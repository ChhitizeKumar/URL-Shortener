import { Router } from "express";
import { generateShortUrl, handelUrlAnalytics } from "../controllers/url.controller.js";

const router = Router();

router.route("/").post(generateShortUrl);

router.route("/analytics/:shortId").get(handelUrlAnalytics)

export default router;