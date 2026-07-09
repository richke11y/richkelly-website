export default class ContactForm extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {

		this.formDisabled = false;

		this.form = this.querySelector('form');
		this.formStatus = this.form.querySelector('.form-status');
		this.formInputs = this.form.querySelectorAll('.input');
		this.formSubmitBttn = this.form.querySelector('#submit-button');
		this.formActionAttr = this.form.action;

		this.form.addEventListener('submit', this.submitEvent.bind(this));

	}

	submitEvent(e) {

		e.preventDefault();

		this.toggleFormDisabled();

		this.handleFormStatus(true);

		this.formStatusText('Submitting...');

		this.handleFormData();

	}

	toggleFormDisabled() {

		if (this.formDisabled) {

			this.formDisabled = false;

			this.formInputs.forEach((input) => input.removeAttribute('readonly'));
			this.formSubmitBttn.disabled = false;

		} else {

			this.formDisabled = true;

			this.formInputs.forEach((input) => input.setAttribute('readonly', true));
			this.formSubmitBttn.disabled = true;

		}

	}

	formReset() {

		console.log('formReset()');

		this.form.reset();

		this.handleFormStatus(false);

		this.formStatusText('');

	}

	handleFormStatus(show) {

		if (show) {

			this.formStatus.style.display = 'block';

		} else {

			this.formStatus.style.display = 'none';

		}

	}

	formStatusText(text) {

		if (typeof text === 'string' && text.trim() !== '') {

			this.formStatus.innerHTML = `<p>${text}</p>`

		}

	}

	handleFormData() {

		console.log('handleFormData()');

		const formData = new FormData(this.form);
		const data = Object.fromEntries(formData.entries());

		console.log(formData);
		console.log(data);

		this.submitTheForm(data);

	}

	handleInputErrors(errors) {

		if (typeof errors === 'object' || errors.length > 0) {

			const inputs = Array.from(this.formInputs);

			for (const [key, value] of Object.entries(errors)) {

				const inputWithError = inputs.find((input) => key === input.name);

				const p = document.createElement('p');
				p.classList.add('error');
				p.innerText = value;

				inputWithError.classList.add('has-error');
				inputWithError.parentElement.appendChild(p)
			
			}

		}

	}

	async submitTheForm(data) {

		try {

			const response = await fetch(this.formActionAttr, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			console.log('response:');
			console.log(response)

			const result = await response.json();

			console.log('result:')
			console.log(result);

			console.log(`response ok: ${response.ok}`);

			if (response.status === 200 && result.success) {

				setTimeout(() => this.formReset(), 5000);

			} else {

				this.handleInputErrors(result.errors);

			}

			this.formStatusText(result.message);

			this.handleFormStatus(true);

		} catch(error) {

			console.error(error);

		} finally {

			setTimeout(() => this.toggleFormDisabled(), 5000);

		}

	}

}

window.customElements.define('contact-form', ContactForm);