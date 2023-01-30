import { Router } from "express";
import ticketRouter from "./ticketRouter.js";
import tripRouter from "./tripRouter.js";
import authRouter from "./authRouter.js";
import { tokenValidation } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.use(authRouter);
router.use("/*", tokenValidation);
router.use(ticketRouter);
router.use(tripRouter);

export default router;
