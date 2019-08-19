
export const isAllowedRoute = (route, parent) => { 
    const user = JSON.parse(localStorage.getItem('user'));
    const userType = user ? user.role : '';
    
    var allow = true;
    if (userType ===0) {
        allow = true;
        return allow
    }

    

        if (parent==="Admin Area") {
            allow = false
        }
    

    return allow;
}