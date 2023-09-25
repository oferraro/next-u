
const login = {
    loginForm: false,
    token: false,
    userData: false,
    start() {
        const loginForm = document.querySelector('#loginForm');
        this.loginForm = loginForm;
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            return false;
        });
        // TODO: if has token change login link template (login-link)
        const token = storage.get(storageKeyToken);
        
        this.userData = storage.getJson(userDataKeyToken);
        if (this.userData) {
            this.setUserData(this.userData);
        }
    },
    async login() {
        const errorMessage = document.querySelector('#loginModal #login-error');
        errorMessage.style.display = 'none';

        const data = {
            username: this.loginForm.username.value,
            password: this.loginForm.password.value
        };
        const result = await fetchClass.post(`${apiUrl}auth/login.php`, data);
        if (result.success) {
            this.token = result.token;
            this.userData = result.userData;
            storage.save(storageKeyToken, this.token);
            storage.saveJson(userDataKeyToken, this.userData);
            this.setUserData();
            document.querySelector('#loginModalCloseButton').click();
        } else {
            errorMessage.style.display = 'block';
        }
        
    },
    setUserData(userData) {
        const loginLink = document.querySelector('#login-link');
        loginLink.innerHTML = this.logedTemplate(userData);
    },
    logout() {
        storage.remove(storageKeyToken);
        storage.remove(userDataKeyToken);
        const loginLink = document.querySelector('#login-link');
        loginLink.innerHTML = '<a data-toggle="modal" data-target="#loginModal" class="nav-link" href="#">Login</a>';
    },
    logedTemplate(userData) {
        if (!userData) {
            userData = {
                username: '', email: ''
            }
        }
        return `<div class="dropdown profile">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Profile
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div class="entry">${userData.username}</div>
            <div class="entry">${userData.email}</div>
            <div class="entry" id="logoutButton" onclick="login.logout()">logout</div>
        </div>
        </div>`;
    }
};
