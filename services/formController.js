// импортируем регулярки
import { regExpVocabular } from "../constants/regExpVocabular.js";

// Импортируем класс для отправки сообщения
import { FetchingService } from "./fetchingService.js";

export class FormController {
	constructor(form) {
		this.$form = form;
		this.$formElementsArray = [...form.elements].slice(0, -1);
		// сюда собираем объект данных ********
		this.formData = { name: "", phone: "", email: "", message: "", date: "" };
		// Вызываем сразу!
		this.addFormElementsListener();
	}

	fillandValidateFormData = (e) => {
		if (!(e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
		if (regExpVocabular[e.target.name][0].test(e.target.value)) {
			this.formData[e.target.name] = e.target.value;
			e.target.nextElementSibling.textContent = "";
		} else e.target.nextElementSibling.textContent = regExpVocabular[e.target.name][1];
	};

	addFormElementsListener() {
		this.$form.children[1].addEventListener("change", this.fillandValidateFormData);
	}

	async checkForm() {
		let isValid = true;

		// this.formData.date = new Date().toLocaleDateString();

		this.$formElementsArray.map((elem) => {
			if (!this.formData[elem.name]) {
				elem.nextElementSibling.textContent = "Данное поле не заполнено!";
				isValid = false;
			}
		});

		if (isValid) {
			FetchingService.postReqData("../mailer/mail.php", this.$form)
				.then(() => (this.formData = { name: "", phone: "", email: "", message: "", date: "" }))
				.catch((error) => console.log(error.message))
				.finally(() => {
					setTimeout(() => {
						this.$form.reset();
						this.$form.closest("SECTION").classList.remove("active");
					}, 1000);
				});
		}
	}
}

export default FormController;
