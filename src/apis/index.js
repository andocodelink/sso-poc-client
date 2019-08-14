const API_ROOT = 'http://localhost:3002/'

export const greet = async () => {
  fetch(API_ROOT)
    .then(function (response) {
      return response.json()
    })
    .then(function (greeting) {
      console.log(JSON.stringify(greeting))
    })
}