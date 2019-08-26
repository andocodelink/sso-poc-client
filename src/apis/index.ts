const API_ROOT = 'http://localhost:3002'

export const greet = async () => {
  const res = await fetch(API_ROOT, {
  })
  return res.text()
}

export const login= async () => {
  let loginData = new URLSearchParams("username=admin&password=admin")
  const res = await fetch(API_ROOT + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: loginData
  })
  if (res.status == 200) {
    const data = await res.json();
    return data.access_token;
  }

  throw new Error(data.status || 'error');
}

export const loginWithCodelink = async () => {
  const res = await fetch(API_ROOT + '/login-sso', {
    redirect: 'follow',
    method: 'GET'
  })
  if (res.status == 200) {
    if (res.redirected) {
      window.open(res.url);
    }
    const data = await res.json();
    return data.access_token;
  }

  throw new Error(data.status || 'error');
}

export const getSession = async () => {
  const res = await fetch(API_ROOT + '/login', {
  })
  if (res.status == 200) {
    const data = await res.json();
    return data.access_token;
  }

  throw new Error(data.status || 'error');
}

export const logout = async () => {
  const res = await fetch(API_ROOT + '/logout', {
  })
  if (res.status == 200) {
    const data = await res.json();
    if (data.success === 'true') {
      return true;
    }
  }

  throw new Error(data.status || 'error');
}