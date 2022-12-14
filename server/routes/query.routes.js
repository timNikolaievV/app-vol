import express from "express";
import queryCtrl from "../controllers/query.controller";
import authCtrl from "../controllers/auth.controller";
import storageCtrl from "../controllers/storage.controller";

const router = express.Router();

router
  .route("/api/storages/:storageId/queries")
  .get(queryCtrl.listByStorage)
  .post(queryCtrl.create);

router
  .route("/api/storages/:storageId/queries/:queryId")
  .put(queryCtrl.update)
  .delete(queryCtrl.remove)
  .get(queryCtrl.read);

router.route("/api/categories").get(queryCtrl.listCategories);

router.param("storageId", storageCtrl.storageByID);

export default router;
