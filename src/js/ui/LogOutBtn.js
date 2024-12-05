

export function onLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    window.location = "/"
}
   
   