export class HttpService {

  get(url) {
    return fetch(url)
      .then(res => this._handleErrors(res))
      .then(res => res.json());
  }

  post(url, data) {
    return fetch(url, {
        headers: {'Content-type': 'application/json'},
        method: 'post',
        body: JSON.stringify(data)
      })
      .then(res => this._handleErrors(res));
  }

  _handleErrors(res) {
    if (res.ok) {
      return res;
    }

    throw new Error(res.statusText);
  }
}
