
const login = {
    loginForm: false,
    token: false,
    start() {
        this.loginForm = document.querySelector('#loginForm');
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            return false;
        });
    },
    async login() {
        const data = {
            username: this.loginForm.username.value,
            password: this.loginForm.password.value
        };
        const result = await fetchClass.post(`${apiUrl}auth/login.php`, data);
        if (result.success) {
            this.token = result.token;
        } else {
            alert('login error');
            // TODO: Add an error in the DOM
            // TODO: Save token in localStorage
        }
    }
};
