import storages from "./mock/storages.json";

export async function getAllStorages() {
  return Promise.resolve(storages);
}

export async function getStorageById(id) {
  const storages = await getAllStorages();
  const storage = storages.find((x) => x.storageId === id);

  return Promise.resolve(storage);
}



//export default getStorage;
