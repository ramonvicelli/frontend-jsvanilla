class MessageView {
  constructor(element) {
    this._element = element;
  }

  _template(model) {
    return `<p class="alert alert-info">${model}</p>`;
  }

  update(model) {
    this._element.innerHTML = this._template(model);
  }
}
