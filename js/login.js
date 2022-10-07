const loginForm = getId(document)('login-form');
const formSelector = selector(loginForm);
const loginInput = formSelector('input');
const greeting = getId(document)('greeting');
const mainContent = dGetId('main-content');
const footer = selector(document)('footer');
const header = selector(document)('header');

const USERNAME_KEY = 'username';
const HIDDEN_CLASS = 'hidden';

function paintGreeting(username) {
    removeClass(mainContent, HIDDEN_CLASS);
    removeClass(header, HIDDEN_CLASS);
    removeClass(footer, HIDDEN_CLASS);
    const hours = new Date().getHours();
    const paint = (text) => (greeting.innerText = text);
    if (hours < 12 && hours >= 6) {
        paint(`Good Morning! ${username}`);
    } else if (hours >= 12 && hours < 18) {
        paint(`Good Afternoon! ${username}`);
    } else {
        paint(`Good Evening! ${username}`);
    }
}
function onLoginSubmit(e) {
    e.preventDefault();
    const username = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASS);
    setStorage(USERNAME_KEY, username);
    paintGreeting(username);
    paintBookmark(JSON.parse(getStorage(BOOKMARK_KEY)));
}
