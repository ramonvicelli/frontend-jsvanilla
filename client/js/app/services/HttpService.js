class HttpService {

  get(url) {
    return fetch(url)
      .then(res => this._handleErrors(res))
      .then(res => res.json());
  }

  _handleErrors(res) {
    if (res.ok) {
      return res;
    }

    throw new Error(res.statusText);
  }
}
