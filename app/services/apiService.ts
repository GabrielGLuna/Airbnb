const apiService = {
    get: async function(url: string): Promise<any> {
        console.log("API HOST en tiempo de ejecución:", process.env.NEXT_PUBLIC_API_HOST);
        console.log('get', url);
        return new Promise((resolve, reject) => {
            console.log("API HOST:", process.env.NEXT_PUBLIC_API_HOST);

            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response', json);
                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response', json);
                    resolve(json);
                })
                .catch((error) => {
                    console.error('Error en Post:', error);
                    reject(error);
                });
        });
    }
};
export default apiService;
