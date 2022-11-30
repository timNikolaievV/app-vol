import express from 'express'
import storageCtrl from '../controllers/storage.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/storages')
  .get(storageCtrl.list)
  .post(storageCtrl.create)

router.route('/api/storages/:storageId')
  .get(authCtrl.requireSignin, storageCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, storageCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, storageCtrl.remove)

router.param('storageId', storageCtrl.storageByID)

export default router
