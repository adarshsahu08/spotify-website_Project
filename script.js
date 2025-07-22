let songs = [
    { songName: "wavy- karan aujla ", filePath: "songs/11.mp3", coverPath: "6.jpg" },
    { songName: "Shaky-Sanju- Rathod song", filePath: "songs/12.mp3", coverPath: "10.jpg" },
    { songName: "dooron dooron- paresh pahuja", filePath: "songs/13.mp3", coverPath: "5.jpg" },
    { songName: "Closer - Chainsmokers", filePath: "songs/4.mp3", coverPath: "2.jpg" },
    { songName: "Perfect - Ed Sheeran", filePath: "songs/5.mp3", coverPath: "1.jpg" },
    { songName: "Senorita - Shawn Mendes", filePath: "songs/6.mp3", coverPath: "3.jpg" }
];

let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById('masterBtn');
let progressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songInfo = document.querySelector('.songInfo');
let forwardBtn = document.querySelector('.fa-forward');
let backwardBtn = document.querySelector('.fa-backward');

// Set song list data
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;
});

// Update play button and song info
function playSong(index) {
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
    songInfo.innerText = songs[index].songName;
}

// Play/Pause toggle
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

// Reset all play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('fa-circle-play')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
    });
};

// Individual song click
Array.from(document.getElementsByClassName('songlistplay')).forEach((element, i) => {
    element.addEventListener('click', () => {
        makeAllPlays();
        songIndex = i;
        playSong(songIndex);
    });
});

//  Forward Button
forwardBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

//  Backward Button
backwardBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});
