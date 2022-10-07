const savedUsername = getStorage(USERNAME_KEY);
const userBookmarks = JSON.parse(getStorage(BOOKMARK_KEY));

/* Set Initial Bookmark */
if (userBookmarks === null || !userBookmarks.length) {
    setBookmark();
}

if (savedUsername === null) {
    // show the form
    // else hidden
    loginForm.classList.remove(HIDDEN_CLASS);
    addEvent(loginForm, 'submit', onLoginSubmit);
} else {
    // hide the form
    // else show
    loginForm.classList.add(HIDDEN_CLASS);
    paintGreeting(savedUsername);
    paintBookmark(JSON.parse(getStorage(BOOKMARK_KEY)));
    paintTodo(getTodo());
    paintQuote();
}
function handleResizeElements(e) {
    const innerWidth = e.currentTarget.innerWidth;
    const asideLastChild = selector(document)('#main-content aside:last-child');
    const asideWrapper = selector(document)('#aside-child-wrapper');
    const quoteWrapper = dGetId('quote-wrapper');
    const weatherWrapper = dGetId('weather-wrapper');
    const asideChilds = [quoteWrapper, weatherWrapper];
    if (innerWidth < 1600) {
        appendChild(asideWrapper, asideChilds);
    } else {
        appendChild(asideLastChild, asideChilds);
    }
}
addEvent(window, 'resize', handleResizeElements);
addEvent(window, 'load', handleResizeElements);
