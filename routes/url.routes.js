import { Router } from "express";
import { generateShortUrl } from "../controllers/url.controller.js";

const router = Router();

router.route("/").post(generateShortUrl);

export default router;