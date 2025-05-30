class ColourMode extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {

		this.colourMode = window.localStorage.colourMode;

		if (this.colourMode !== undefined) {

			this.getHTMLElement.dataset.colourMode = this.colourMode;

		}

		this.addEventListener('click', this.clickEvent.bind(this));


	}

	clickEvent(e) {

		const closestButton = e.target.closest('.button') ? true : false;

		if (closestButton) {

			const button = e.target.closest('.button');

			this.button(button);

		}

	}

	button(button) {

		const colourMode = button.dataset.colourMode;

		this.setColourMode(colourMode);

	}

	setColourMode(colourMode) {

		this.colourMode = colourMode;

		this.getHTMLElement.dataset.colourMode = this.colourMode;

		window.localStorage.colourMode = this.colourMode;

	}

	get getHTMLElement() {
		return document.querySelector('html');
	}

}

window.customElements.define('colour-mode', ColourMode);