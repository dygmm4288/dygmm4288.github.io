const musicContainer = dGetId('music-container');
const musicPlayTimeInput = dGetId('music-playtime');
const musicPlayTimeWrapper = dGetId('music-playtime-wrapper');
const musicCurrentTime = dGetId('music-current-time');
const musicEndTime = dGetId('music-end-time');
const musicPlay = dGetId('music-play');
const musicPause = dGetId('music-pause');
const musicBackward = dGetId('music-backward');
const musicForward = dGetId('music-forward');
const musicVolume = dGetId('music-volume');
const musicMute = dGetId('music-mute');
const musicTitle = dGetId('music-title');
const musicIcon = dGetId('music-icon');
const musicVolumeInput = dGetId('volume-range');
const musicVolumeSlider = dGetId('music-volume-slider');

const TYPE_BACKWARD = 'backward';
const TYPE_FORWARD = 'forward';

var player,
    currentIndex = 0,
    lastTimeUpdate = 0,
    iframeWindow;

const videos = [
    'hZgc5GgAHgE',
    'KVvWn0R0l_g',
    'jfKfPfyJRdk',
    '8_p8VoHF2NE',
    'YmZLR7311O4',
];
const tag = ce('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('music-player', {
        height: '0',
        width: '0',
        videoId: videos[currentIndex],
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
    iframeWindow = player.getIframe().contentWindow;
}
const toggleHidden = partial(toggleClass, undefined, HIDDEN_CLASS);
function onPlayerReady(e) {
    handleTitle(e.target.videoTitle);
    e.target.setVolume(100);
    handlePlayTime(e);
}
function onPlayerStateChange(e) {
    const ROTATE_CLASS = 'rotate';
    handlePlayTime(e);
    handleTitle(e.target.videoTitle);
    if (
        e.data === YT.PlayerState.PLAYING ||
        e.data === YT.PlayerState.BUFFERING
    ) {
        toggleClass(musicIcon.querySelector('i'), ROTATE_CLASS);
        removeClass(musicPause, HIDDEN_CLASS);
        setClass(musicPlay, HIDDEN_CLASS);
    } else {
        toggleClass(musicIcon.querySelector('i'), ROTATE_CLASS);
        removeClass(musicPlay, HIDDEN_CLASS);
        setClass(musicPause, HIDDEN_CLASS);
    }
}
function handlePlayTime(e) {
    musicPlayTimeInput.value = e.target.getCurrentTime();
    musicPlayTimeInput.max = e.target.getDuration();
    musicCurrentTime.innerText = timeToString(e.target.getCurrentTime());
    musicEndTime.innerText = timeToString(e.target.getDuration());
}
function handleTitle(title) {
    musicTitle.innerText = title;
}
function handlePlay() {
    if (player?.getPlayerState() !== 1) {
        player.playVideo();
    } else if (player?.getPlayerState() === 1) {
        player.pauseVideo();
    }
}
function handleChangeMusic(type) {
    return () => {
        let nextIndex;
        const len = videos.length;
        if (type === TYPE_BACKWARD) {
            nextIndex = (currentIndex + len - 1) % len;
            currentIndex = nextIndex;
        } else if (type === TYPE_FORWARD) {
            nextIndex = (currentIndex + 1) % len;
            currentIndex = nextIndex;
        }
        player?.loadVideoById(videos[currentIndex]);
    };
}
function handleVolume() {
    const input = musicVolumeInput;
    if (player?.isMuted()) {
        player.unMute();
        input.value = player.getVolume();
    } else if (!player?.isMuted()) {
        player.mute();
        input.value = 0;
    }
    toggleHidden(musicVolume);
    toggleHidden(musicMute);
}
function handleVolumeRange(e) {
    if (e.target) {
        const volume = e.target.value;
        player?.setVolume(volume);
    } else {
        player?.setVolume(e);
    }
}
function handleVolumeSlider() {
    musicVolumeSlider.style.opacity = 1;
}
function handelOffVolumeSlider() {
    setTimeout(() => {
        musicVolumeSlider.style.opacity = 0;
    }, 3000);
}
function updatePlayTime(e) {
    if (e.source === iframeWindow) {
        const data = JSON.parse(e.data);
        if (
            data.event === 'infoDelivery' &&
            data.info &&
            data.info.currentTime
        ) {
            const time = Math.floor(data.info.currentTime);
            if (time !== lastTimeUpdate) {
                lastTimeUpdate = time;
            }
            musicCurrentTime.innerText = timeToString(lastTimeUpdate);
            musicPlayTimeInput.value = lastTimeUpdate;
        }
    } else {
        iframeWindow = player.getIframe().contentWindow;
    }
}
function seekPlayTime(e) {
    player.seekTo(e.target.value);
}
function setEvents() {
    addEvent(musicPlay, 'click', handlePlay);
    addEvent(musicPause, 'click', handlePlay);
    addEvent(musicBackward, 'click', handleChangeMusic(TYPE_BACKWARD));
    addEvent(musicForward, 'click', handleChangeMusic(TYPE_FORWARD));
    addEvent(musicVolume, 'click', handleVolume);
    addEvent(musicMute, 'click', handleVolume);
    addEvent(musicVolumeInput, 'change', handleVolumeRange);
    addEvent(musicVolume, 'mouseover', handleVolumeSlider);
    addEvent(musicMute, 'mouseover', handleVolumeSlider);
    addEvent(musicVolume, 'mouseleave', handelOffVolumeSlider);
    addEvent(musicMute, 'mouseleave', handelOffVolumeSlider);
    addEvent(window, 'message', updatePlayTime);
    addEvent(musicPlayTimeInput, 'change', seekPlayTime);
}
setEvents();
