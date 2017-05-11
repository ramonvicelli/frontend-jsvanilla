class MessageView {
  constructor(element) {
    this._element = element;
  }

  _template(model) {
    const text = model.text;

    return text ? `<p class="alert alert-info">${text}</p>` : '<p></p>';
  }

  update(model) {
    this._element.innerHTML = this._template(model);
  }
}
