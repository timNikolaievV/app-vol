import express from "express";
import categoryCtrl from "../controllers/category.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/categoieys").get(categoryCtrl.list);

router
  .route("/api/categories/:categoryId")
  .get(authCtrl.requireSignin, categoryCtrl.read);

router.param("categoryId", categoryCtrl.categoryByID);

export default router;
