class MessageView {
  constructor(element) {
    this._element = element;
  }

  _template(text) {
    return `<p class="alert alert-info">${text}</p>`;
  }

  update(text) {
    this._element.innerHTML = this._template(text);
  }
}
