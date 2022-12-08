import express from "express";
import queryCtrl from "../controllers/query.controller";
import authCtrl from "../controllers/auth.controller";
import storageCtrl from "../controllers/storage.controller";

const router = express.Router();

router
  .route("/api/queries/by/:storageId")

  .get(queryCtrl.listByStorage);

router.route("/api/queries").post(queryCtrl.create); // authCtrl.requireSignin,
router.route("/api/queries/categories").get(queryCtrl.listCategories);

router.param("storageId", storageCtrl.storageByID);
//router.param("queryId", queryCtrl.queryByID);

export default router;
