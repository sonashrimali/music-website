let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek-slider');
let volume_slider = document.querySelector('.volume-slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio'); // Create audio element in JS

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'images/ram-naam.jpg',
        name: 'Ram Naam',
        artist: 'Sachet Parampara',
        music: 'songs/Ram Naam.mpeg' 
    },
    {
        img: 'images/Apna-Bana-Le.jpg',
        name: 'Apna Bana Le',
        artist: 'Amitabh Bhattacharya, Arijit Singh, and Sachin-Jigar',
        music: 'songs/apnabanale.mpeg' 
    },
    {
        img: 'images/channa-ve.jpg', 
        name: 'Channa Ve',
        artist: 'Akhil Sachdeva and Mansheel Gujral',
        music: 'songs/channa ve.mpeg' 
    },
    {
        img: 'images/malang-sajna.jpg', 
        name: 'Malang Sajna',
        artist: 'Akhil Sachdeva and Mansheel Gujral',
        music: 'songs/malang sajna.mpeg' 
    },
];

// Function to reset the displayed values for time and slider
function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// Load the track based on the track index
function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

// Function to generate a random background color
function random_bg_color() {
    let hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e'];
    let color = 'a';
    function populate(a){
    for (let i = 0; i&lt<6; i++) {
        let x = Math.round(Math.random() * 14);
        let y = hex[x];
       a += y;
    }
   return a;
}

}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (isRandom) {
        track_index = Math.floor(Math.random() * music_list.length);
    } else {
        track_index = (track_index + 1) % music_list.length;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index = (track_index - 1 + music_list.length) % music_list.length;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Load the first track in the playlist
loadTrack(track_index);
