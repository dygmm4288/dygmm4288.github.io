const clock = dGetId('clock');
function setClock() {
    const date = new Date();
    const pad = (number) => number.toString().padStart(2, '0');
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());

    clock.innerText = `${hh}:${mm}:${ss}`;
}
setClock();
setInterval(setClock, 1000);
