import { hitDishesArray, imageArray } from "../constants/data.js";

// показ активного слайда в галерее
export function showCurrentSlide(node, counter) {
	node.querySelector("img").src = imageArray[counter];
}

// РЕНДЕРИНГ ГАЛЕРЕИ ИЗОБРАЖЕНИЙ
export function renderGalleryPhotoContainerItems(node, data) {
	data.forEach(({ src, title, icon }) => {
		let temp = `<div class="gallery__photoContainer__item">
            <img src=${src} alt="1" title=${title}/>
            <span class="${icon}"></span>
        </div>`;

		node.insertAdjacentHTML("beforeend", temp);
	});
}

// РЕНДЕРИНГ ССЫЛОК НА СОЦИАЛЬНЫЕ СЕТИ
export function renderSocialLinksItems(node, data) {
	data.forEach(({ url, icon }) => {
		let temp = `<a href="${url}">
            <span class="${icon}"></span>
        </a>`;
		node.insertAdjacentHTML("beforeend", temp);
	});
}

// РЕНДЕРИНГ КОНТЕНА ДЛЯ КОНКРЕТНОЙ ТАБЫ
export function renderContent(node, index) {
	const { name, pict, desc, prod, id } = hitDishesArray.find((dish) => dish.id === index);
    
	let template = `
    <article class="tabs__content_card active">
        <h4 class="tabs__content_card_name">${name}</h4>        
        <a href="./dishesPage.html?id=${id}" title="ПОДРОБНЕЕ...">
            <img src="${pict}" alt="" class="tabs__content_card_pict" />
        </a>
        <p class="tabs__content_card_desc">
        ${desc}
        </p>
        <div class="tabs__content_card_prod">
            ${prod}
        </div>
    </article>`;

	node.innerHTML = template;
}
