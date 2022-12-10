import queryString from "query-string";

const create = async (query, credentials) => {
  try {
    let response = await fetch(`/api/storages/${query.storage}/queries`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
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
    const query = queryString.stringify(params);
    let response = await fetch(
      `/api/storages/${params.storageId}/queries?` + query,
      {
        method: "GET",
        signal: signal,
      }
    );
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

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      `/api/storages/${params.storageId}/queries/${params.queryId}`,
      {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const update = async (params, credentials, query) => {
  try {
    let response = await fetch(
      `/api/storages/${params.storageId}/queries/${params.queryId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: JSON.stringify(query),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      `/api/storages/${params.storageId}/queries/${params.queryId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listByStorage, list, listCategories, update, remove, read };
//list,
