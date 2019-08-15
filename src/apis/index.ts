const API_ROOT = 'http://localhost:3002'

export const greet = async () => {
  const res = await fetch(API_ROOT, {
    credentials: 'include',
  })
  return res.text()
}

export const loginWithCodelink = async () => {
  let loginData = new URLSearchParams("username=admin&password=admin")
  const res = await fetch(API_ROOT + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    credentials: 'include',
    body: loginData
  })
  if (res.status == 200) {
    const data = await res.json();
    return data.access_token;
  }

  throw new Error(data.status || 'error');
}

export const getSession = async () => {
  const res = await fetch(API_ROOT + '/login', {
    credentials: 'include'
  })
  if (res.status == 200) {
    const data = await res.json();
    return data.access_token;
  }

  throw new Error(data.status || 'error');
}

export const logout = async () => {
  const res = await fetch(API_ROOT + '/logout', {
    credentials: 'include',
  })
  if (res.status == 200) {
    const data = await res.json();
    if (data.success === 'true') {
      return true;
    }
  }

  throw new Error(data.status || 'error');
}