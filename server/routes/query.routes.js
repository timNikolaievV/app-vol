import express from "express";
import queryCtrl from "../controllers/query.controller";
import authCtrl from "../controllers/auth.controller";
import storageCtrl from "../controllers/storage.controller";

const router = express.Router();

router
  .route("/api/queries/by/:storageId")
  .post(authCtrl.requireSignin, queryCtrl.create) // shopCtrl.isOwner,
  .get(queryCtrl.listByStorage);

router.route("/api/queries/categories").get(queryCtrl.listCategories);

router.param("storageId", storageCtrl.storageByID);
//router.param("queryId", queryCtrl.queryByID);

export default router;
