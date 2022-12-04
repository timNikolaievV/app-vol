import express from "express";
import queryCtrl from "../controllers/query.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/queries").get(storageCtrl.list).post(storageCtrl.create);

router
  .route("/api/queries/:storageId")
  .get(authCtrl.requireSignin, storageCtrl.read)
  .put(authCtrl.requireSignin, storageCtrl.update)
  .delete(authCtrl.requireSignin, storageCtrl.remove);

router.param("storageId", storageCtrl.storageByID);

export default router;
