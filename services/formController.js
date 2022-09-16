// импортируем регулярки
import { regExpVocabular } from "../constants/regExpVocabular.js";

export class FormController {
	constructor(form) {
		this.$formElementsArray = [...form.elements].slice(0, -1);
		this.$form = form;
		// сюда собираем объект данных ********
		this.formData = { name: "", phone: "", email: "", message: "", date: "" };
		// Вызываем сразу!
		this.addListener();
	}

	fillandValidateFormData = (e) => {
		if (!(e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
		if (regExpVocabular[e.target.name][0].test(e.target.value)) {
			this.formData[e.target.name] = e.target.value;
			e.target.nextElementSibling.textContent = "";
		} else e.target.nextElementSibling.textContent = regExpVocabular[e.target.name][1];
	};

	addListener() {
		this.$form.children[1].addEventListener("change", this.fillandValidateFormData);
	}

	checkForm() {
		let isValid = true;

		this.formData.date = new Date().toLocaleDateString();

		this.$formElementsArray.map((elem) => {
			if (!this.formData[elem.name]) {
				elem.nextElementSibling.textContent = "Данное поле не заполнено!";
				isValid = false;
			}
		});

		if (isValid) {
			this.$form.reset();
			this.formData = { name: "", phone: "", email: "", message: "", date: "" };
			setTimeout(() => this.$form.closest("SECTION").classList.remove("active"), 1000);
		}
	}
}

export default FormController;
