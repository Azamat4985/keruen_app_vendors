export async function checkTokenServer(serverUrl, token) {
  let result;
  let formData = new FormData();
  formData.append("token", token);
  await fetch(`${serverUrl}/vendor/checkToken`, {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      result = await res.json();
    })
    .catch(async (error) => {
      // result = { result: false, msg: "Нет соединения с сервером. Попробуйте еще раз" };
      result = await res.json();
    });

  return result;
}

export async function serverRequest(serverUrl, path, method, formData) {
  let result;
  if (method.toUpperCase() == "POST") {
    await fetch(serverUrl + path, {
      method: method,
      body: formData,
    }).then(async (res) => {
      result = await res.json();
    });
  } else if(method.toUpperCase() == "GET") {
    await fetch(serverUrl + path, {
      method: method,
    }).then(async (res) => {
      result = await res.json();
    }).catch((error) => {
      return {success: false}
    })
  }

  return result;
}
