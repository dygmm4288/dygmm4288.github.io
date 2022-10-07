const quoteContainer = dGetId('quote-container');
const initialQuotes = [
    {
        _id: 'JIk3cbQ8s',
        author: 'Michael Jordan',
        content:
            "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
        tags: ['sports', 'competition', 'famous-quotes'],
        authorSlug: 'michael-jordan',
        length: 224,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'nAOVUhK6RJ',
        author: 'Kareem Abdul-Jabbar',
        content: "You can't win unless you learn how to lose.",
        tags: ['sports', 'competition'],
        authorSlug: 'kareem-abdul-jabbar',
        length: 43,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'Wp2A_oOWNEq',
        author: 'Muhammad Ali',
        content:
            "It's just a job. Grass grows, birds fly, waves pound the sand. I beat people up.",
        tags: ['sports'],
        authorSlug: 'muhammad-ali',
        length: 80,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'x-0qEVIZ66n',
        author: 'Eric Liddell',
        content: 'God made me fast. And when I run, I feel His pleasure.',
        tags: ['sports', 'competition'],
        authorSlug: 'eric-liddell',
        length: 54,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'NIMf1RxZS1N',
        author: 'Knute Rockne',
        content:
            'One man practicing sportsmanship is far better than a hundred teaching it.',
        tags: ['sports', 'competition'],
        authorSlug: 'knute-rockne',
        length: 74,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'gZMl2CrQvRQ',
        author: 'Ted Williams',
        content:
            'Baseball is the only field of endeavor where a man can succeed three times out of ten and be considered a good performer.',
        tags: ['sports', 'competition'],
        authorSlug: 'ted-williams',
        length: 121,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'xYHasPkPjV7',
        author: 'Robert Griffin III',
        content:
            'Football is football and talent is talent. But the mindset of your team makes all the difference.',
        tags: ['sports', 'competition'],
        authorSlug: 'robert-griffin-iii',
        length: 97,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: '-5LundE5jXD',
        author: 'Erma Bombeck',
        content:
            'If a man watches three football games in a row, he should be declared legally dead.',
        tags: ['sports', 'humorous'],
        authorSlug: 'erma-bombeck',
        length: 83,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'ch-0pti9X6U',
        author: 'Joe Adcock',
        content:
            'Trying to sneak a fastball past Hank Aaron is like trying to sneak the sunrise past a rooster.',
        tags: ['sports', 'competition'],
        authorSlug: 'joe-adcock',
        length: 94,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'MsGmNTCtAXd',
        author: 'Mike Singletary (basketball)',
        content:
            'Do you know what my favorite part of the game is? The opportunity to play.',
        tags: ['sports', 'competition'],
        authorSlug: 'mike-singletary-basketball',
        length: 74,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'gUYV-XJG60p',
        author: 'Woodrow Wilson',
        content:
            'Golf is a game in which one endeavors to control a ball with implements ill adapted for the purpose.',
        tags: ['sports', 'competition'],
        authorSlug: 'woodrow-wilson',
        length: 100,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'l1g_brfDMZy',
        author: 'Billie Jean King',
        content:
            'Tennis is a perfect combination of violent action taking place in an atmosphere of total tranquillity.',
        tags: ['sports', 'competition'],
        authorSlug: 'billie-jean-king',
        length: 102,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'Yul4uqMwfA1',
        author: 'Arnold Palmer',
        content:
            'What other people may find in poetry or art museums, I find in the flight of a good drive.',
        tags: ['sports', 'competition'],
        authorSlug: 'arnold-palmer',
        length: 90,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'CEURHvpb3u',
        author: 'J. Paul Getty',
        content:
            "If you owe the bank $100 that's your problem. If you owe the bank $100 million, that's the bank's problem.",
        tags: ['business'],
        authorSlug: 'j-paul-getty',
        length: 106,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-06',
    },
    {
        _id: 'Z1z6kZ2Qp8',
        author: 'Elon Musk',
        content:
            "If you're trying to create a company, it's like baking a cake. You have to have all the ingredients in the right proportion.",
        tags: ['business'],
        authorSlug: 'elon-musk',
        length: 124,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-06',
    },
    {
        _id: 'l0LfTgApB3',
        author: 'Babe Ruth',
        content:
            "The way a team plays as a whole determines its success. You may have the greatest bunch of individual stars in the world, but if they don't play together, the club won't be worth a dime.",
        tags: ['sports', 'competition'],
        authorSlug: 'babe-ruth',
        length: 186,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'vtzyn3LKIA',
        author: 'Wayne Gretzky',
        content:
            'A good hockey player plays where the puck is. A great hockey player plays where the puck is going to be.',
        tags: ['sports', 'competition'],
        authorSlug: 'wayne-gretzky',
        length: 104,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'fwMKi2Q0Pk',
        author: 'Michael Phelps',
        content:
            "You can't put a limit on anything. The more you dream, the farther you get.",
        tags: ['sports', 'competition'],
        authorSlug: 'michael-phelps',
        length: 75,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'eF07T22v0Te',
        author: 'P. G. Wodehouse',
        content: "To find a man's true character, play golf with him.",
        tags: ['sports', 'competition'],
        authorSlug: 'p-g-wodehouse',
        length: 51,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
    {
        _id: 'r7qJ-YKIq2e',
        author: 'Earl Monroe',
        content:
            "Just be patient. Let the game come to you. Don't rush. Be quick, but don't hurry.",
        tags: ['sports', 'competition'],
        authorSlug: 'earl-monroe',
        length: 81,
        dateAdded: '2022-07-06',
        dateModified: '2022-07-08',
    },
];

/* Quote Type
   _id: string',
    author: 'Michael Jordan',
    content:
        "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
    tags: ['sports', 'competition', 'famous-quotes'],
    authorSlug: 'michael-jordan',
    length: 224,
    dateAdded: '2022-07-06',
    dateModified: '2022-07-08'  ,
 */
const CONTENT = 'quote-content';
const AUTHOR = 'quote-author';
/* UI */
function createQuote(quotes) {
    return _.map(quotes, (quote, i) => {
        const li = ce('li');
        const content = ce('p');
        const author = ce('p');

        /* Class */
        content.classList.add(CONTENT);
        author.classList.add(AUTHOR);
        /* Text */
        content.innerText = quote.content;
        author.innerText = quote.author;
        /* Style */
        styleLeft(li, `${100 * i}%`);
        /* Event */
        addEvent(li, 'mouseover', clearAutoSlide);
        addEvent(li, 'mouseout', startAutoSlide);

        appendChild(li, [content, author]);
        return li;
    });
}
function paintQuote() {
    quoteContainer.innerHTML = '';

    const quotes = createQuote(initialQuotes);

    appendChild(quoteContainer, quotes);
}

/* Slide */
const slideContainer = dGetId('quote-container');
const slideLength = initialQuotes.length;
let timer,
    currentIdx = 0;

function goToSlide(idx) {
    styleLeft(slideContainer, `${idx * -100}%`);
    currentIdx = idx;
}
function startAutoSlide() {
    timer = setInterval(() => {
        const nextIndex = (currentIdx + 1) % slideLength;
        goToSlide(nextIndex);
    }, 5000);
}
function clearAutoSlide() {
    clearInterval(timer);
}
startAutoSlide();
