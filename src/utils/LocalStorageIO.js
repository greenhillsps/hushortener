const localStorage = global.window.localStorage;

const LocalStorageIO = {
 
    getUser() {
        return JSON.parse(localStorage.user||null);
    },
    getToken() {
        try {

            return localStorage.token;
        } catch (e) {
            return ''
        }

    }
}

export default LocalStorageIO;