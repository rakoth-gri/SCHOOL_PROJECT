// ДАННЫЕ
import * as data from "../constants/data.js";

// СЕРВИСЫ
import * as services from "../services/services.js";

// словарь регулярок
import { regExpVocabular } from "../constants/regExpVocabular.js";

// Контроллер формы
import FormController from "../services/formController.js";

// КОНСТАНТЫ ----
import {
	headerSocialLinksContainer,
	galleryPhotoContainer,
	exit,
	PopupImg,
	PopupContainer,
	hitDishesTabsButtons,
	hitDishesTabs,
	hitDishesTabsContent,
	modalForm,
	modal,
	showModalBtn,
	footerSocialLinksContainer,
	wayUp,
} from "../constants/mainElems.js";

// ПОЯВЛЕНИЕ / ИСЧЕЗНОВЕНИЕ КНОПКИ wayUp
window.addEventListener("scroll", () => {
	document.documentElement.scrollTop > 400 ? wayUp.classList.add("active") : wayUp.classList.remove("active");
});

// ПЛАВНЫЙ СКРОЛЛ К ВЕРХНЕМУ КРАЮ ОКНА - TIMEOUT
let timer;
wayUp.addEventListener("click", function () {
	let offset = document.documentElement.scrollTop;
	animatedScrollUp(offset);
});

function animatedScrollUp(offset) {
	if (offset > 0) {
		offset -= 50;
		window.scrollTo(0, offset);
		timer = setTimeout(() => animatedScrollUp(offset), 20);
	} else {
		clearTimeout(timer);
		window.scrollTo(0, 0);
	}
}

//  ПЛАВНАЯ ПРОКРУТКА ДО КОНКРЕТНОЙ СЕКЦИИ ******
document.querySelector(".menu").addEventListener("click", (e) => {	
	e.preventDefault();	
	if (!e.target.closest("li")) return;

	document.querySelector(e.target.id).scrollIntoView({
		block: "start",
		behavior: "smooth",
	});
});

// МОДАЛЬНОЕ ОКНО ********
function showModal() {
	modal.classList.toggle("active");
	modalForm.classList.toggle("active");
	document.body.style.overflow = "hidden";
}
showModalBtn.addEventListener("click", showModal);

// ЗАКРЫВАЕМ МОДАЛЬНОЕ -- Версия 2
modal.addEventListener("click", (e) => {
	if (e.target === modal || e.target === exit) {
		modal.classList.toggle("active");
		modalForm.classList.toggle("active");
		document.body.style.overflowY = "";
	}
});

// РЕНДЕРИМ ГАЛЕРЕЮ ИЗОБРАЖЕНИЙ  *********
services.renderGalleryPhotoContainerItems(galleryPhotoContainer, data.galleryPhotoContainerItemArray);

//  СЛАЙДЕР ГАЛЕРЕИ! **********
let currentSlide = 0;

gallery.addEventListener("mouseup", showPopup);
function showPopup({ target }) {
	if (target.tagName !== "IMG") return;

	PopupImg.src = target.id;

	PopupContainer.classList.toggle("active");

	// первый рендер с анимацией
	PopupImg.classList.add("active");

	currentSlide = data.imageArray.indexOf(target.id);

	PopupContainer.addEventListener("click", SliderController);
}

// КОНТРОЛЛЕР СЛАЙДЕРА *********
function SliderController({ target }) {
	switch (true) {
		case target.className === "next":
			currentSlide++;
			break;
		case target.className === "prev":
			currentSlide--;
			break;
		// Закрытие галереи
		default:
			this.classList.toggle("active");
			PopupImg.classList.toggle("active");
			this.removeEventListener("click", SliderController);
			break;
	}

	// ПРОВЕРКА ГРАНИЧНЫЙ УСЛОВИЙ ****
	if (currentSlide >= data.imageArray.length) currentSlide = 0;
	if (currentSlide < 0) currentSlide = data.imageArray.length - 1;

	// РЕНДЕРИНГ СЛАЙДА *****
	services.showCurrentSlide(this, currentSlide);
}

// ТАБЫ ******

// ПЕРВЫЙ ВЫЗОВ ДЛЯ АКТИВНОЙ ТАБЫ
services.renderTabContent(hitDishesTabsContent, "1");

hitDishesTabs.addEventListener("click", activeTab);

function activeTab(e) {
	if (e.target.tagName !== "BUTTON") return;
	hitDishesTabsButtons.forEach((button) => button.classList.remove("active"));
	e.target.classList.add("active");
	services.renderTabContent(hitDishesTabsContent, e.target.id);
}

// РЕНДЕРИНГ ИКОНОК СОЦ СЕТЕЙ FOOTER / HEADER *****
services.renderSocialLinksItems(footerSocialLinksContainer, data.SocialLinksArray);
services.renderSocialLinksItems(headerSocialLinksContainer, data.SocialLinksArray);

// ВАЛИДАЦИЯ И КОНТРОЛЛИНГ ФОРМЫ (ООП)

// вызываем конструктор единожды!
const formController = new FormController(modalForm);

document.forms.modalForm.addEventListener("submit", (e) => {
	e.preventDefault();
	formController.checkForm();
});
