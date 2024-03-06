export const fetchApi = async (api) => {
    const response = await fetch(api,
      {
        method: "GET"
      });
    const result = await response.json();
    return result;
  }
export const fetchApiPost = async (api, data) => {
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}
export const fetchApiPut = async (api, data) => {
  const response = await fetch(api, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}
export const fetchApiDelete = async (api) => {
  const response = await fetch(api, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
}
export const  getQueryParams=() =>{
  const queryParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of queryParams.entries()) {
    params[key] = value;
  }
  return params;
}