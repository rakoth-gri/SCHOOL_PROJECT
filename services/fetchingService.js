export class FetchingService {
	static postReqData(url, form) {
		return fetch(url, {
			method: "POST",
			// headers: {
			// 	"Content-Type": "multipart/form-data;charset=utf-8",
			// },
			body: new FormData(form),
		}).then(() => `Объект ${new FormData(form)} успешно отправлен на почту`);
	}
}
