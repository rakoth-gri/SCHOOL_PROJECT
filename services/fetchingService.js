

export class FetchingService {
    
    static postReqData(url, data, form) {

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data) 
        })
        .then(()=> "ВСЕ УСПЕШНО ОТПРАВИЛОСЬ")
        .catch((error) => console.log(error.message))
        .finally(() => {
            setTimeout(() => {
                form.reset();
                form.closest("SECTION").classList.remove("active")
            }, 1000)
        })
        
    }
}