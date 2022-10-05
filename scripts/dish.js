// Константы
import { SocialLinksArray } from "../constants/data.js";

// сервисы
import * as services from "../services/services.js";

// константы
import {headerSocialLinksContainer, hitDishesTabsContent, footerSocialLinksContainer} from "../constants/dishElems.js";

// Получаем из WINDOW объект queryParams и обрабатываем:
let id = location.search.replace(/[^\d]+/, "");

// рендерим содержимое табов
services.renderTabContent(hitDishesTabsContent, id);

// рендерим социальные иконки в header
services.renderSocialLinksItems(headerSocialLinksContainer, SocialLinksArray)

// рендерим социальные иконки в footer
services.renderSocialLinksItems(footerSocialLinksContainer, SocialLinksArray)
   






