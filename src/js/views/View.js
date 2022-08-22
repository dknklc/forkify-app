import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Dekan KILIÇ
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const html = this._generateMarkup();

    if (!render) return html;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    this._data = data;
    const newHtml = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newHtml); // converts newHTML string to a DOM object.
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl)); // checks whether 2 dom nodes are equal or not.

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('*', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent; // we only update the unequal nodes' textContent.
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const html = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage(message = this._message) {
    const html = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
// We are exporting the class itself because we are not going to create any instances of this class.
