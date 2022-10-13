const songs=[
    {
        name: 'Coast',
        artist:'Hailee Steinfeld',
        img:'./images/coast.jpg',
        source:'./songs/Coast.mp3'
    },
    {
        name: '2step',
        artist:'Ed Sheeran',
        img:'./images/2step.jpg',
        source:'./songs/2step.mp3'
    },
    {
        name: 'Believer',
        artist:'imagine Dragaons',
        img:'./images/believers.jpg',
        source:'./songs/Believer.mp3'
    },
    {
        name: 'American Pie',
        artist:'Don McLean',
        img:'./images/american-pie.jpg',
        source:'./songs/American-pie.mp3'
    },
    {
        name: ' While My Guitar Gently Weeps',
        artist:'The Beatles',
        img:'./images/guitar.jpg',
        source:'./songs/Guitar.mp3'
    },
    {
        name: 'We Will Rock You',
        artist:'Queen',
        img:'./images/rock.jpg',
        source:'./songs/Rock.mp3'
    },
    {
        name: 'Sugar',
        artist:'Maroon 5',
        img:'./images/sugar.jpg',
        source:'./songs/Sugar.mp3'
    },
    {
        name: 'Uptown Funk',
        artist:'Mark Ronson',
        img:'./images/uptown.jpg',
        source:'./songs/Uptown.mp3'
    },
];

const image=document.getElementById('track-img');
const song=document.getElementById('track-name');
const artist=document.getElementById('artist-name');
const curTime=document.getElementById('cur-time');
const trackInput=document.getElementById('track-input');
const totalTime=document.getElementById('total-time');
const previous=document.getElementById('previuos');
const play=document.querySelector('#play i');
const next=document.getElementById('next');
const shuffle=document.getElementById('shuffle')
const volume=document.querySelector('#volume i');
const volInput=document.getElementById('vol-input');
const audio=document.createElement('audio');
const container=document.querySelector('.container');

let index=0;
let cm, cs, tm, ts, time;
let isShuffled=false;
let isPlaying=false;
volInput.value=40;

// loading the current track
function loadTrack(i){
    audio.src=songs[i].source;
    image.src=songs[i].img;
    song.textContent=songs[i].name;
    artist.textContent=songs[i].artist;
    audio.load();

    time=setInterval(updateTime, 1000);
    backGround();
    audio.addEventListener('ended', nextTrack);
};
loadTrack(index);

// update current and duration time for current track;
function updateTime(){
    if(!isNaN(audio.duration)){
        cm=Math.floor(audio.currentTime/60)
    cs=Math.floor(audio.currentTime-(cm*60));
    tm=Math.floor(audio.duration/60)
    ts=Math.floor(audio.duration-(tm*60));

    cm=cm<10 ? '0'+cm : cm;
    cs=cs<10 ? '0'+cs : cs;
    tm=tm<10 ? '0'+tm : tm;
    ts=ts<10 ? '0'+ts : ts;
      
    curTime.textContent=`${cm} : ${cs}`;
    totalTime.textContent=`${tm} : ${ts}`;
    trackInput.value=audio.currentTime;
    trackInput.max=audio.duration;
    }
    
    trackInput.addEventListener('input', ()=>{
        audio.currentTime=trackInput.value;
        if(isPlaying){
            audio.play();
        }
    })
};

// Getting previous track
function previousTrack(){
    if(isShuffled){
        index=Math.floor(Math.random()*songs.length);
    }else{
        index= index==0 ? songs.length-1 : index-1;
    }
    loadTrack(index);
    if(isPlaying){
        audio.play();
    }
};

//Getting get next track
function nextTrack(){
    if(isShuffled){
        index=Math.floor(Math.random()*songs.length);
    }else{
        index= index==songs.length-1 ? 0 : index+1;
    }
    loadTrack(index);
    if(isPlaying){
        audio.play();
    }
};

// Shuffling track
function shuffleTrack(){
    console.log(shuffle);
   if(!isShuffled){
    shuffle.style.color='#2827CC';
    isShuffled=true;
   }else{
    shuffle.style.color='#fff';
    isShuffled=false;
  }
};
// updating volumes
function updateVolume(){
    if(volInput.value==0){
        volume.classList.remove('fa-volume-low','fa-volume-high');
        volume.classList.add('fa-volume-xmark');
    }else if(volInput.value<60){
        volume.classList.remove('fa-volume-xmark','fa-volume-high');
        volume.classList.add('fa-volume-low');
    }else{
        volume.classList.remove('fa-volume-low','fa-volume-xmark');
        volume.classList.add('fa-volume-high');
    }
};

// Change the background color of container for each track
function backGround(){
    let char='0123456789abcdef'
    let c1='#';
    let c2='#';
    for(let i=1; i<7; i++){
       c1+=char[Math.floor(Math.random()*16)];
       c2+=char[Math.floor(Math.random()*16)];
    }
   container.style.background=`linear-gradient(to left top, ${c1}, ${c2}`;  
};

// adding eventlistener for all functions
play.addEventListener('click', ()=>{
    if(!isPlaying){
        play.classList.replace('fa-play', 'fa-pause');
        audio.play();
        isPlaying=true;
    }else{
        play.classList.replace('fa-pause', 'fa-play')
       audio.pause();
       isPlaying=false;
    }
});
previous.addEventListener('click', previousTrack);
next.addEventListener('click', nextTrack);
volInput.addEventListener('input', ()=>{
    audio.volume=volInput.value/100;
    updateVolume();
});
shuffle.addEventListener('click', shuffleTrack);

 




