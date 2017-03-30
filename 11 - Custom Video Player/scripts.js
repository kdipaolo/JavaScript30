const video = document.querySelector('.player__video');
const range = document.querySelectorAll('input[type="range"]');
const player = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const progressBar = document.querySelector('.progress');
const progress = document.querySelector('.progress__filled');
const playerButton = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('button[data-skip]');

function scrub(e){
  const percentage = e.offsetX / video.videoWidth
  video.currentTime = video.duration * percentage
}

function playVideo(){
  video.paused ? video.play() : video.pause();
}

function skip(){
  video.currentTime = video.currentTime + Number(this.dataset.skip);
}

function configChange(){
  if(this.name == 'volume'){
    video.volume = this.value;
  }else{
    video.playbackRate = this.value
  }
}

function videoPlaying(){
  progress.style.flexBasis = (video.currentTime / video.duration) * 100 + "%";
}

function updateButton(){
  toggle.innerHTML = video.paused ? '►' : '||';
}

player.addEventListener('click', playVideo)
video.addEventListener('timeupdate', videoPlaying)
video.addEventListener('pause', updateButton)
video.addEventListener('play', updateButton)
playerButton.addEventListener('click', playVideo)
progressBar.addEventListener('mousedown', scrub)
skipButtons.forEach(button => {
  button.addEventListener('click', skip)
})
range.forEach(item => {
  item.addEventListener('mousedown', configChange)
  item.addEventListener('mousemove', configChange)
})
