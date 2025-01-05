// try {
// return songs

// } catch (error) {
//     console.log(error)
// }
// finally{
//     console.log(songs)
// }

// const v = document.querySelector(".")

// console.log("let's start spotify javascript");




async function getsongs() {

    let song = await fetch("https://github.com/vinayakbosamiya/spotify/tree/master/spotify/songs/") // fetch the songs from the server
    let response = await song.text(); // get the response in text format
    // console.log(response)
    let div = document.createElement("div"); // create a div element
    div.innerHTML = response;
    // let li = getElementsByTagName("") // get all the li tags
    let as = div.getElementsByTagName("a") // get all the a tags 
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // console.log(index, element.href) // print the index and the href of the element
            songs.push(element.href.split("/songs/")[1])

        }
    }
    return songs

}
// let audio = new Audio("/songs/" + track)
let currentSong = new Audio();
const playMusic = (track, pause = false) => {
    currentSong.src = "https://github.com/vinayakbosamiya/spotify/tree/master/spotify/songs/" + track // set the source of the audio 
    // console.log(!pause)
    if (!pause) {
        play.src = "pause.svg";
        currentSong.play();
    }
    document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " ") // or decodeURI(track) decodeURI is function which is used to decode the URI  
    document.querySelector(".songtime").innerHTML = "0:00 / 0:00 "
}


let songs;
async function main() {

    // get songs
    songs = await getsongs()
    playMusic(songs[0], true)
    // console.log(songs)
    // show all the songs in the playlist
    // sort code 
    let songul = document.querySelector(".songList").getElementsByTagName("ul")[0] // get the ul tag from the songList class and get the first ul tag and store in the songul variable

    // OR     // full code   // let songuls = document.querySelector(".songList").getElementsByTagName("ul");  // let songul = songuls[0];





    // console.log(`${song.replaceAll("%20", " ")}`)
    for (const song of songs) {
        songul.innerHTML += `<li> <img src="music.svg" alt="music" class="invert">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                <!-- <div>Rajesh Ahir</div>-->  <!-- this is song artist-->
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                 <img id = "played-paused"src="play.svg" class="invert playlogo" alt="">
                            </div>
                                </li>`}







    // attach an event listener to each song
    // console.log(e.querySelector(".info > div").innerHTML.trim())
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info > div").innerHTML)
            playMusic(e.querySelector(".info > div").innerHTML.trim())
        })
    });
    // Attech an event listener to play song and pause song
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            play.src = "pause.svg"
            currentSong.play()
        }
        else {
            play.src = "play.svg"
            currentSong.pause()
        }

    })

    // this function is convert to seconds to minutes : seconds

    function convertSecondsToTime(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return '00:00';
        }
        // Calculate minutes and remaining seconds
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        // Add leading zeros to minutes and seconds
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    // Listen for the timeupdate event
    currentSong.addEventListener('timeupdate', () => {
        //   console.log("curent time = ",currentSong.currentTime) // Your code here
        //   console.log("durations = ", currentSong.duration) // Your code here
        document.querySelector(".songtime").innerHTML = `${convertSecondsToTime(currentSong.currentTime)} / ${convertSecondsToTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + '%'
    });

    // event listener for the seekbar line 
    // this is very hard to understand this logic in this code
    // console.log("this is offsetX = ",e.offsetX, "this is  target = ",e.target.getBoundingClientRect().width)
    document.querySelector('.seekbar').addEventListener('click', (e) => {
        let percentage = (e.offsetX / e.target.getBoundingClientRect().width) * 100; // this is calculate seecbar line in percentage
        document.querySelector(".circle").style.left = percentage + "%"; // this is set in the circle in percentage
        currentSong.currentTime = (currentSong.duration * percentage) / 100; // this is set the current time with percentage 
        // document.querySelector(".seekbar").style.background = `linear-gradient(to right, #00dfff 0%,  #00dfff ${percentage}%, black ${percentage}%, black 100%)` // this is set the background color of the seekbar with move thi circle


    })

    // lets addeventlitener to the menubar
    document.querySelector(".menu").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0px"



    })
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    })
    // add an event listener to previous and next button
    previous.addEventListener("click", () => {
        // console.log("previous")
        // console.log(currentSong)
        
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
        // console.log("this is index = ", index - 1, "this is length = ", 0)

    })
    
        // console.log("this is index = ", 0, "this is length = ", songs.length)
    next.addEventListener("click", () => {
        // console.log("next")
        // console.log(currentSong)
        // console.log(currentSong.src)
        // console.log(songs,index);

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length ) { 
            // console.log("this is index = ", index +1, "this is length = ", songs.length)
            playMusic(songs[index + 1])
        }
    })

    // add an event listener to the volume button
    const input= document.querySelector(".range").getElementsByTagName("input")[0]
    input.addEventListener("change",(e)=>{
        // console.log(e, e.target,e.target.value)
        let setvolume = currentSong.volume = parseInt(e.target.value)/100
        // console.log(currentSong.volume = parseInt(e.target.value)/100)
    })
}

main()
