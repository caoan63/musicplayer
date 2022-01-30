"use strict"

import { SONGS_PACK } from "./postdata.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $('.player')
const cd = $(".cd");
const cdWidth = cd.offsetWidth;
const heading = $("header h2");
const thumb = $(".cd-thumb");
const audio = $("#audio");
const playButton = $(".btn-toggle-play");
const progress = $("#progress");
const prevButton = $(".btn-prev");
const nextButton = $(".btn-next");
const randomButton = $(".btn-random");
const repeatButton = $(".btn-repeat");
const playlist = $('.playlist');
const submitButton = $('.btn-submit');
const volume = $("#volume");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
      {
        "name":"Mixtape Ngày Xuân Long Phụng Sum Vầy",
        "singer":"Lam Trường",
        "path":"https://mp3-320s1-zmp3.zadn.vn/248451f9e0bd09e350ac/4179724348758783903?authen=exp=1643605433~acl=/248451f9e0bd09e350ac/*~hmac=26016f7929a48731232c4e1662e8fd95&fs=MTY0MzQzMjYzMzQwMXx3ZWJWNnwxMDA1MDAzNDkzfDE0LjI0MS4xNTYdUngMTky",
        "image":"https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/avatars/b/9/b9355dbc597fa6bd1a2940f55866789a_1430741859.jpg"
      }, 
      { 
        "name": "Mùa Xuân Ơi", 
        "singer": "Mây Trắng", 
        "path": "https://vnso-zn-5-tf-mp3-320s1-zmp3.zadn.vn/11a604d59f9176cf2f80/5977665035173534935?authen=exp=1643610854~acl=/11a604d59f9176cf2f80/*~hmac=f471ef828add00058bd454dd0b8f5e3b&fs=MTY0MzQzODA1NDIxNHx3ZWJWNnwxMDYzNjIwNTA0fDE3MS4yNDmUsICdUngMTUxLjE0NQ", 
        "image": "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/covers/e/7/e714950cfd661790bd6e96954248db09_1362240362.jpg" 
      }, 
      { 
        "name": "Liên Khúc Đón Xuân - Xuân Đã Về", 
        "singer": "Cẩm Ly", 
        "path": "https://mp3-320s1-zmp3.zadn.vn/a41596d62292cbcc9283/2279273211780561270?authen=exp=1643610685~acl=/a41596d62292cbcc9283/*~hmac=0930c592d8fa63b904f441e3ff0a95b9&fs=MTY0MzQzNzg4NTUzNXx3ZWJWNnwwfDEdUngNTMdUngMTmUsIC1Ljk3", 
        "image": "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/covers/4/c/4cfcaa97232769f2afb463275306bb9b_1307182206.jpg" 
      }, 
      { 
        "name": "Bên Em Mùa Xuân", 
        "singer": "Lam Trường", 
        "path": "https://mp3-320s1-zmp3.zadn.vn/54a83c0aa84e4110185f/2914959532990513286?authen=exp=1643611050~acl=/54a83c0aa84e4110185f/*~hmac=0f95c6c8502c9d6f0e0dc86debda349d&fs=MTY0MzQzODI1MDkzNHx3ZWJWNnwxMDYzNjIwNTA0fDE3MS4yNDmUsICdUngMTUxLjE0NQ", 
        "image": "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/avatars/b/9/b9355dbc597fa6bd1a2940f55866789a_1430741859.jpg" 
      }, 
      { 
        "name": "Thì Thầm Mùa Xuân", 
        "singer": "Phan Đình Tùng", 
        "path": "https://mp3-320s1-zmp3.zadn.vn/e5b9b40a2a4ec3109a5f/978773297498429847?authen=exp=1643611210~acl=/e5b9b40a2a4ec3109a5f/*~hmac=eec0b8f2ba652945de615dbb93346e77&fs=MTY0MzQzODQxMDYxMHx3ZWJWNnwxMDYzNjIwNTA0fDE3MS4yNDmUsICdUngMTUxLjE0NQ", 
        "image": "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/covers/c/2/c270eb7dd0e8b6b2e46e7b8efb3a1362_1454379741.jpg" 
      }, 
      { 
        "name": "Khúc Giao Mùa", 
        "singer": "Mỹ Linh, Minh Quân", 
        "path": "https://mp3-320s1-zmp3.zadn.vn/8317d6bb95ff7ca125ee/5752696334567171144?authen=exp=1643610747~acl=/8317d6bb95ff7ca125ee/*~hmac=d5f84637c3a844b0c19e75ac331a1720&fs=MTY0MzQzNzk0NzmUsIC0OXx3ZWJWNnwxMDgxMDg2NzU0fDEdUngNTIdUngMTk0LjE4NQ", 
        "image": "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/covers/4/b/4b1c59c7728e2b1cb65f6cb20aaf5cf9_1285661724.jpg" 
      }
    ],
    loadDataToSongs: function() {
    },
    loadCurrentSong: function() {
      heading.textContent = this.currentSong.name;
      thumb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path;
    },
    loadNextSong: function() {
      this.currentIndex++;
      if(this.currentIndex >= this.songs.length)
        this.currentIndex = 0;
      this.loadCurrentSong()
    },
    loadPrevSong: function() {
      this.currentIndex--;
      if(this.currentIndex < 0)
        this.currentIndex = this.songs.length - 1;
      this.loadCurrentSong()
    },
    loadRandomSong: function() {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random()*this.songs.length); 
      } while(newIndex === this.currentIndex)
      
      this.currentIndex = newIndex;
      this.loadCurrentSong()
    },
    activeCurrentSong: function() {
      var currentActive = $('.song.active');
      var target = $$(".song")[this.currentIndex];
      if(currentActive)
      {
        currentActive.classList.remove('active');
        target.classList.add('active');
      } else
        target.classList.add('active');
      this.scrollToActiveSong();
    },
    scrollToActiveSong: function() {
      setTimeout(() => {
        $('.song.active').scrollIntoView('true', {
          behavior: 'smooth',
          block: 'center'
        })
      }, 300)
    },
    loadDefaultVolume: function() {
      audio.volume = volume.value/100;
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
          return `
          <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
          `
        })
      playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
      Object.defineProperty(this, 'currentSong', {
        get: function() {
          return this.songs[this.currentIndex];
        }
      })
    },
    handleEvent: function() {
      const _this = this;

      // CD Rotate/Pause
      const cdThumbAimation = thumb.animate([
        {transform: 'rotate(360deg)'}
      ],{duration: 10000,
        iterations: Infinity})
      cdThumbAimation.pause();

      // Xử lý phóng to thu nhỏ CD
      document.onscroll = function() {
        const scrollTop = document.documentElement.scrollTop || window.scrollY;
        const newWidth = cdWidth - scrollTop;
        cd.style.width = newWidth > 0 ? newWidth + 'px': 0;
        cd.style.opacity = newWidth/cdWidth;
      }

      // Xử lý khi bấm button Play
      playButton.onclick = function() {
        if(_this.isPlaying)
        {
          _this.isPlaying = false;
          audio.pause();
          player.classList.remove('playing');
        } else  {
          _this.isPlaying = true;
          audio.play();
          player.classList.add('playing');
        }
      }

      // playing song
      audio.onplay = function() {
        _this.isPlaying = true;
        player.classList.add("playing");
        cdThumbAimation.play();
      }
      // Pausing song
      audio.onpause = function() {
        _this.isPlaying = false;
        player.classList.remove("playing");
        cdThumbAimation.pause();
      }

      // update rateBar while playing
      audio.ontimeupdate = function() {
        const rateTime = Math.floor(audio.currentTime/audio.duration*100);
        if(rateTime)
          progress.value = rateTime;
      }

      // song setduration
      progress.onchange = function(e) {
        const seekTime = e.target.value*audio.duration/100;
        audio.currentTime = seekTime;
      }

      // prevSong
      prevButton.onclick = function() {
        if(_this.isRandom) {
          _this.loadRandomSong();
        }
        else
          _this.loadPrevSong();
        audio.play();
        progress.value = 0;
        _this.activeCurrentSong();
      }

      // nextSong
      nextButton.onclick = function() {
        if(_this.isRandom) {
          _this.loadRandomSong();
        }
        else
          _this.loadNextSong();
        audio.play();
        progress.value = 0;
        _this.activeCurrentSong();
      }

      // randomSong 
      randomButton.onclick = function() {
        _this.isRandom = !_this.isRandom;
        randomButton.classList.toggle("active", _this.isRandom);
      }

      // repeatSong
      repeatButton.onclick = function() {
        _this.isRepeat = !_this.isRepeat;
        repeatButton.classList.toggle("active", _this.isRepeat);
      }

      // next song after ended
      audio.onended = function() {
        if(_this.isRepeat) {
          audio.play();
        } else {
          nextButton.click();
        } 
      }

      //select song 
      playlist.ondblclick = function(e) {
        const songElement = e.target.closest('.song:not(.active)');
        if(songElement  || e.target.closest('.option'))
        {
          if(songElement)
          {
            _this.currentIndex = songElement.dataset.index;
            _this.loadCurrentSong();
            _this.activeCurrentSong();
            audio.play();
          }
        }
      }
      
      // get Adding item info
      submitButton.onclick = function() {
        const name = document.querySelector("input[name='song-name']").value;
        const singer = document.querySelector("input[name='singer-name']").value;
        const path = document.querySelector("input[name='song-url']").value;
        const image = document.querySelector("input[name='song-img']").value;
        const data = {
            name: name,
            singer: singer,
            path: path,
            image: image
          }
      }

      volume.oninput = function(e) {
        audio.volume = e.target.value/100;
      }
    },
    start: function() {
        this.loadDataToSongs();
        this.loadDefaultVolume();
        this.defineProperties();
        this.handleEvent();
        this.loadCurrentSong(); // load first song when app start
        this.render(); // render playlist
    }
    
}

app.start();