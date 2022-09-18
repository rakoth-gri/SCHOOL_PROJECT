// Константы
import { SocialLinksArray } from "../constants/data.js";

// сервисы
import * as services from "../services/services.js";

// константы
import {headerSocialLinksContainer, hitDishesTabsContent, footerSocialLinksContainer} from "../constants/constDishesPage.js";

// Получаем из WINDOW объект queryParams и обрабатываем:
let id = location.search.replace(/[^\d]+/, "");

services.renderContent(hitDishesTabsContent, id);
services.renderSocialLinksItems(headerSocialLinksContainer, SocialLinksArray)
services.renderSocialLinksItems(footerSocialLinksContainer, SocialLinksArray)
   






