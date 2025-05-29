class ColourMode extends HTMLElement {

	constructor() {

		super();

		this.colourMode = window.localStorage.colourMode;

		if (this.colourMode !== undefined) {

			this.getHTMLElement.dataset.colourMode = this.colourMode;

		}

	}

	connectedCallback() {

		this.addEventListener('click', this.clickEvent.bind(this));

	}

	clickEvent(e) {

		const closestButton = e.target.closest('.colour-button') ? true : false;
		const colourMode = e.target.closest('.colour-button').dataset.colourMode;

		if (closestButton) this.setColourMode(colourMode);

	}

	setColourMode(colourMode) {

		this.getHTMLElement.dataset.colourMode = colourMode;

		window.localStorage.colourMode = colourMode;		

	}

	get getHTMLElement() {
		return document.querySelector('html');
	}

}

window.customElements.define('colour-mode', ColourMode);