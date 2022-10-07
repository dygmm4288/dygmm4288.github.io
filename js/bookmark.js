const bookmarkWrapper = dGetId('bookmark-wrapper');
const bookmarkContainer = dGetId('bookmark-container');
const bookmarkModal = dGetId('bookmark-modal');
const bookmarkOverlay = dGetId('bookmark-overlay');
const bookmarkModalForm = dGetId('bookmark-form');
const bookmarkExitButton = selector(bookmarkModal)('.field button:first-child');
const BOOKMARK_KEY = 'bookmark';

/* Overlay */
addEvent(bookmarkOverlay, 'click', () => {
    hideBookmarkModal();
});

/* Modal Submit */
addEvent(bookmarkModalForm, 'submit', (e) => {
    e.preventDefault();
    enrollBookmark();
    paintBookmark(JSON.parse(getStorage(BOOKMARK_KEY)));
    hideBookmarkModal();
});
addEvent(bookmarkExitButton, 'click', () => {
    hideBookmarkModal();
});
const initialBookmarks = [
    {
        name: 'Google',
        href: 'https://google.com',
        favicon: 'https://google.com/favicon.ico',
    },
    {
        name: 'Naver',
        href: 'https://naver.com',
        favicon: 'https://naver.com/favicon.ico',
    },
    {
        name: 'NomardCoders',
        href: 'https://nomadcoders.co',
        favicon: 'https://nomadcoders.co/m.png',
    },
];

function paintBookmark(bookmarks) {
    /* First init */
    bookmarkContainer.innerHTML = '';

    const bookmarkItems = createBookmarkItem(bookmarks);

    const li = ce('li');
    const button = ce('button');
    const plusIcon = createIcon('fa-solid', 'fa-plus');
    addEvent(li, 'click', (e) => showBookmarkModal(e));
    addEvent(button, 'click', (e) => {
        showBookmarkModal(e);
    });
    appendChild(button, [plusIcon]);
    appendChild(li, [button]);
    appendChild(bookmarkContainer, [...bookmarkItems, li]);

    // show
    bookmarkWrapper.classList.remove(HIDDEN_CLASS);
}
function createBookmarkItem(bookmarks) {
    return _.map(bookmarks, (bookmark) => {
        const li = ce('li');
        const img = ce('img');
        const link = ce('a');
        const span = ce('span');
        const removeIcon = createIcon('fa-solid', 'fa-xmark');

        addEvent(removeIcon, 'click', () => removeBookmark(bookmark.name));

        link.href = bookmark.href;

        span.innerText = bookmark.name;
        appendChild(link, [img, span]);
        img.src = bookmark.favicon;
        img.alt = `${bookmark.name} icon`;

        addEvent(img, 'error', () => {
            img.src = './images/favicon-standard.png';
        });
        appendChild(li, [link, removeIcon]);

        return li;
    });
}
function setBookmark(bookmarks = initialBookmarks) {
    setStorage(BOOKMARK_KEY, JSON.stringify(bookmarks));
}
function removeBookmark(bookmarkName) {
    const bookmarks = JSON.parse(getStorage(BOOKMARK_KEY));
    const nextBookmarks = _.filter(
        bookmarks,
        (bookmark) => bookmark.name !== bookmarkName,
    );
    setBookmark(nextBookmarks);
    paintBookmark(nextBookmarks);
}
function showBookmarkModal(e) {
    const clientX = e.clientX + 'px';
    const clientY = e.clientY + 'px';
    const urlInput = dGetId('bookmark-url');

    bookmarkModal.classList.remove(HIDDEN_CLASS);
    bookmarkOverlay.classList.remove(HIDDEN_CLASS);

    styleLeft(bookmarkModal, clientX);
    styleTop(bookmarkModal, clientY);

    urlInput.focus();
}
function hideBookmarkModal() {
    bookmarkModal.classList.add(HIDDEN_CLASS);
    bookmarkOverlay.classList.add(HIDDEN_CLASS);
}
function enrollBookmark() {
    const modalSelector = selector(bookmarkModal);
    const urlInput = modalSelector('#bookmark-url');
    const nameInput = modalSelector('#bookmark-name');

    const urlValue = urlInput.value;
    const nameValue = nameInput.value || urlValue;

    const bookmarkItem = {
        name: nameValue,
        href: urlValue,
        favicon: `${urlValue}/favicon.ico`,
    };
    const newBookmarks = JSON.parse(getStorage(BOOKMARK_KEY));
    newBookmarks.push(bookmarkItem);
    setStorage(BOOKMARK_KEY, JSON.stringify(newBookmarks));

    urlInput.value = '';
    nameInput.value = '';
}
