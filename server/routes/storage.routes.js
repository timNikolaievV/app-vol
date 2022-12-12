import express from "express";
import storageCtrl from "../controllers/storage.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/storages").get(storageCtrl.list).post(storageCtrl.create);

router
  .route("/api/storages/:storageId")
  .get(storageCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.permit("admin"), storageCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.permit("admin"), storageCtrl.remove);

router.param("storageId", storageCtrl.storageByID);

export default router;
