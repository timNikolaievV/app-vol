const create = async (storage, credentials) => {
  try {
    let response = await fetch(`/api/storages/${storage.storageId}/queries`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storage),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch("/api/queries/", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByStorage = async (params, signal) => {
  try {
    let response = await fetch(`/api/storages/${params.storageId}/queries`, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listCategories = async (signal) => {
  try {
    let response = await fetch("/api/categories", {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
// const read = async (params, credentials, signal) => {
//   try {
//     let response = await fetch("/api/queries/" + params.storageId, {
//       method: "GET",
//       signal: signal,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + credentials.t,
//       },
//     });
//     return await response.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

const update = async (params, credentials, storage) => {
  try {
    let response = await fetch("/api/queries/" + params.storageId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(storage),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/queries/" + params.storageId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listByStorage, list, listCategories };
//list, read, update, remove
