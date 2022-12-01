import express from "express";
import categoryCtrl from "../controllers/category.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/categories").get(categoryCtrl.list);

export default router;
