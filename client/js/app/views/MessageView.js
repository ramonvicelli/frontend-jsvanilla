class MessageView {
  constructor(element) {
    this._element = element;
  }

  _template(model) {
    return `<p class="alert alert-info">${model.text}</p>`;
  }

  update(model) {
    console.log(this._element);
    this._element.innerHTML = this._template(model);
  }
}
