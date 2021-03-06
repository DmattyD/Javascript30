// Get Our Elements //
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
// const fullscreenButton = player.querySelector('.fullscreen');


/// Build the functions ///
// function togglePlay() {
//     if(video.paused) {
//         video.play();
//     } else {
//         video.pause();
//     }
// }
/// can also be written as terniary
 function togglePlay() {
 const method = video.paused ? 'play' : 'pause';
 video[method]();} //-- call the method on the video

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    video[method]();
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;

}

function scrub(e) { /// click to move to desired time function
const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// function fullscreen(e) {
//     const size = window
// }
/// hook up event listenters.
// toggle.addEventListener('click', fullscreen)

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);