export async function checkTokenServer(serverUrl, token) {
  let result;
  let formData = new FormData();
  formData.append("token", token);
  await fetch(serverUrl, {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      result = { result: true, data: await res.json() };
    })
    .catch((error) => {
      // result = { result: false, msg: "Нет соединения с сервером. Попробуйте еще раз" };
      result = { result: true, data: {success: false} };
    });

  return result;
}

export async function serverRequest(serverUrl, path, method, data){
  let formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key])
  }
  let result;
  await fetch(serverUrl + path, {
    method: method,
    body: formData
  }).then(async (res) => {
    result = await res.json();
  })
  return result;
}