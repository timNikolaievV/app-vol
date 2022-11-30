import Storage from '../models/storage.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req, res) => {
  const storage = new Storage(req.body)
  try {
    await storage.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load storage and append to req.
 */
const storageByID = async (req, res, next, id) => {
  try {
    let storage = await Storage.findById(id)
    if (!storage)
      return res.status('400').json({
        error: "Storage not found"
      })
    req.profile = storage
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve storage"
    })
  }
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const list = async (req, res) => {
  try {
    let storages = await Storage.find().select('name email updated created')
    res.json(storages)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let storage = req.profile
    storage = extend(storage, req.body)
    storage.updated = Date.now()
    await storage.save()
    storage.hashed_password = undefined
    storage.salt = undefined
    res.json(storage)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let storage = req.profile
    let deletedStorage = await storage.remove()
    deletedStorage.hashed_password = undefined
    deletedStorage.salt = undefined
    res.json(deletedStorage)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  storageByID,
  read,
  list,
  remove,
  update
}
