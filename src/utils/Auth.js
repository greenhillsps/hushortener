
const localStorage = global.window.localStorage;




export const auth = {


    loggedIn() {
        return !!localStorage.token;
    },

    logout(history) {

        localStorage.clear();
        history.push('/page/login');

    },

};


