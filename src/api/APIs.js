const URL = 'http://127.0.0.1:8000/api/';

export async function authAPI(path, methodName = 'GET', bodyData = {}) {
  const TOKEN = localStorage.getItem('token');
  let methodData = {
    method: methodName,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  if (methodName !== 'GET') {
    methodData = { ...methodData, body: JSON.stringify({ ...bodyData }) };
  }

  try {
    const response = await fetch(URL + path, methodData);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error;
  }
}

export async function fileAPI(path, methodName = 'GET', bodyData = {}) {
  const TOKEN = localStorage.getItem('token');
  let methodData = {
    method: methodName,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  if (methodName !== 'GET') {
    methodData = { ...methodData, body: bodyData };
  }

  try {
    const response = await fetch(URL + path, methodData);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error;
  }
}

export async function downloadAPI(path, file, methodName = 'GET', bodyData = {}) {
  const TOKEN = localStorage.getItem('token');
  let methodData = {
    method: methodName,
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  if (methodName !== 'GET') {
    methodData = { ...methodData, body: JSON.stringify({ ...bodyData }) };
  }

  try {
    const response = await fetch(URL + path, methodData);
    if (!response.ok) {
      throw new Error(JSON.stringify(response));
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement('a');
    a.href = url;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return await response.json();
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}

export async function nonAuthAPI(path, methodName = 'GET', bodyData = {}) {
  let methodData = {
    method: methodName,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (methodName !== 'GET') {
    methodData = { ...methodData, body: JSON.stringify({ ...bodyData }) };
  }

  try {
    const response = await fetch(URL + path, methodData);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error;
  }
}
