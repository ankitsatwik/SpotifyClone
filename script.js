console.log("Welcome to spotify");
let SongIndex=0;
let audioElement=new Audio('songs/1.mp3');
let myProgressBar=document.getElementById('songcontroller');
let gif=document.getElementById('gif');
let MasterSongName=document.getElementById('MasterSongName');
let songItem=Array.from(document.getElementsByClassName('songItem'));
let MasterPlay=document.getElementById('MasterPlay');


let songs=[
   {songName: "Song 1", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"}, 
   {songName: "Song 2", filePath:"songs/2.mp3", coverPath: "covers/2.jpg"}, 
   {songName: "Song 3", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"}, 
   {songName: "Song 4", filePath:"songs/4.mp3", coverPath: "covers/4.jpg"}, 
   {songName: "Song 5", filePath:"songs/5.mp3", coverPath: "covers/5.jpg"}, 
   {songName: "Song 6", filePath:"songs/6.mp3", coverPath: "covers/6.jpg"}, 
   {songName: "Song 7", filePath:"songs/7.mp3", coverPath: "covers/7.jpg"}, 
   {songName: "Song 8", filePath:"songs/8.mp3", coverPath: "covers/8.jpg"}, 
   {songName: "Song 9", filePath:"songs/9.mp3", coverPath: "covers/9.jpg"}, 
   {songName: "Song 10", filePath:"songs/10.mp3", coverPath: "covers/10.jpg"} 
]
songItem.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText=songs[i].songName; //It adds song name to the html class name "songname";



})


//Listening to events
//Handle pause/play button
MasterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        MasterPlay.classList.remove('fa-circle-play');
        MasterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        


    }else{
        audioElement.pause();
        MasterPlay.classList.remove('fa-circle-pause');
        MasterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate'); 

    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    //seekbar
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration/100);

})
const makeplay=()=>{
    Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        
    })
}

Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
    // console.log(element);
    element.addEventListener('click',(e)=>{
        makeplay();
        SongIndex=parseInt(e.target.id);
        if(audioElement.paused){
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add("fa-circle-pause");
            
            audioElement.src=`songs/${SongIndex+1}.mp3`;
            // audioElement.currentTime=0;
            audioElement.play();
            MasterSongName.innerText=songs[SongIndex].songName;
            gif.style.opacity=1;
            MasterPlay.classList.remove('fa-circle-play');
            MasterPlay.classList.add('fa-circle-pause');
        }else{
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add("fa-circle-play");
            audioElement.pause();
            gif.style.opacity=0;
            MasterPlay.classList.remove('fa-circle-pause');
            MasterPlay.classList.add('fa-circle-play');
        }
        // e.target.classList.remove('fa-circle-play');
        // e.target.classList.add("fa-circle-pause");
        // audioElement.src=`songs/${SongIndex+1}.mp3`;
        // audioElement.currentTime=0;
        // audioElement.play();
        // gif.style.opacity=1;
        // MasterPlay.classList.remove('fa-circle-play');
        // MasterPlay.classList.add('fa-circle-pause');

    })
});
document.getElementById('next').addEventListener('click',()=>{
    if(SongIndex>=9){
        SongIndex=0;

    }else{
        SongIndex+=1;
    }
    audioElement.src=`songs/${SongIndex+1}.mp3`;
    audioElement.currentTime=0;
    MasterSongName.innerText=songs[SongIndex].songName;
    audioElement.play();
    MasterPlay.classList.remove('fa-circle-play');
    MasterPlay.classList.add('fa-circle-pause');

});
document.getElementById('previous').addEventListener('click',()=>{
    if(SongIndex<=0){
        SongIndex=0;

    }else{
        SongIndex-=1;
    }
    audioElement.src=`songs/${SongIndex+1}.mp3`;
    audioElement.currentTime=0;
    MasterSongName.innerText=songs[SongIndex].songName;
    audioElement.play();
    MasterPlay.classList.remove('fa-circle-play');
    MasterPlay.classList.add('fa-circle-pause');

});