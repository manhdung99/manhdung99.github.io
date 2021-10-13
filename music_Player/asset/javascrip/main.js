
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAY_STORAGE_KEY = 'F8_PLAYER';
const player = $('.player');
const playlist = $('.playlist');
const process = $('#progress');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio   = $('#audio');    
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const app =  {
    curentIndex : 0,
    isPlay : false,
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(PLAY_STORAGE_KEY))|| {},
    songs:[
        {
            name : 'End of time',
            singer: 'K-391,Alan Walker',
            path: './asset/mp3/End-of-Time-K-391-Alan-Walker-Ahrix.mp3',
            image: './asset/image/end-of-time.jpg'
        },
        {
            name : 'Legends-Never-Die',
            singer: 'Jeff Danna',
            path: './asset/mp3/Legends-Never-Die-Jeff-Danna-Mychael-Danna-Against-The-Current.mp3',
            image: './asset/image/legend-never-die.jpg'
        },
        {
            name : 'Please-Don-t-Go',
            singer: 'Joel-Adams',
            path: './asset/mp3/Please-Don-t-Go-Joel-Adams.mp3',
            image: './asset/image/please-dont-go.jpg'
        },
        {
            name : 'See-You-Again',
            singer: 'Wiz-Khalifa,Charlie-Puth',
            path: './asset/mp3/See-You-Again-Absence-Remix-Wiz-Khalifa-Charlie-Puth.mp3',
            image: './asset/image/see-you-again.jpg'
        },
        {
            name : 'Cưới Thôi',
            singer: 'Massew',
            path: './asset/mp3/CuoiThoi-MasiuMasew-7066112.mp3',
            image: './asset/image/cuoi-thoi.jpg'
        },
        {
            name : 'Yêu Là Cưới',
            singer: 'Phát Hồ,X2X',
            path: './asset/mp3/YeuLaCuoi-PhatHoX2X-7084519.mp3',
            image: './asset/image/yeu-la-cuoi.jpg'
        },      
    ],
    // Hàm set config vào strorage
    setConfig: function(key,value){
        this.config[key] = value;
        localStorage.setItem(PLAY_STORAGE_KEY,JSON.stringify(this.config));
    },
    // Hàm xử lý hành động 
    handerEvents: function(){
            const _this = this;
            const cdWidth  = cd.offsetWidth; 
            

            //Xử lý CD quay 
            const cdThumbAnimate = cdThumb.animate([
                {transform : 'rotate(360deg)'}
            ],{
                 duration: 10000,   // 10 second
                 iterations : Infinity
            })
            cdThumbAnimate.pause();

            //Xử lý lúc cuộn con trỏ chuột
            document.onscroll = function(){
                    const scrollTop  = window.scrollY;
                    const newCdWidth = cdWidth - scrollTop;     
                    cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;       
            };
            // Xử lý khi nhấn nút Play 
            playBtn.onclick =function(){
                if(_this.isPlay){
                    audio.pause();
                }else{
                    audio.play();
                }             
            }

            //Khi bài hát được play 
                audio.onplay =function(){
                    _this.isPlay = true;
                    player.classList.add('playing');
                    cdThumbAnimate.play();
                }
            //Khi bài hát bị pause
                audio.onpause = function(){
                    _this.isPlay = false;
                    player.classList.remove('playing')
                    cdThumbAnimate.pause();
                }
            //Khi tiến độ time bài hát thay đổi
                audio.ontimeupdate = function(){
                const processPercent = isNaN(audio.duration) ? 0 : Math.floor(audio.currentTime/audio.duration*100);
                process.value = processPercent ;              
                }
            // Khi tua bài hát
                process.onchange = function(event){
                    const seekTime = event.target.value * audio.duration /100;
                    audio.currentTime = seekTime;
                }
             //Khi chạy hết bài hát 
             audio.onended= function(){
                 if(_this.isRepeat){
                    audio.play();
                 }else{
                    nextBtn.click();
                 }
                 _this.activeSong();
            }
            // Khi nhấn nút next 
            nextBtn.onclick = function(){
                 if(_this.isRandom){
                    _this.randomSong();
                }else{
                    _this.nextSong();
                }
                audio.play();
                _this.activeSong();
                _this.scroolToActiveSong();
            }
            //Khi nhấn nút prev
            prevBtn.onclick = function(){
                if(_this.isRandom){
                    _this.randomSong();
                }else{
                    _this.prevSong();
                }
                audio.play();
                _this.activeSong();
                _this.scroolToActiveSong();
            }
            //Khi nhấn nút random
            randomBtn.onclick = function(){
                _this.isRandom = !_this.isRandom;
                _this.setConfig('isRandom',_this.isRandom);
                randomBtn.classList.toggle('active');
            }
            //Khi ấn nút repeat 
            repeatBtn.onclick = function(){
                _this.isRepeat = !_this.isRepeat;
                _this.setConfig('isRepeat',_this.isRepeat);
                repeatBtn.classList.toggle('active')
            }
            //Khi nhấn vào playlist
            playlist.onclick= function(e){
                const songNode = e.target.closest('.song:not(.active)');
                if(songNode || e.target.closest('.option')){
                    // Xử lý khi click vào song 
                    if(songNode){
                        _this.curentIndex = songNode.dataset.index;
                        _this.loadCurrentSong();
                        audio.play();
                        _this.activeSong();
                    }
                    // Xử lý khi click vào option
                    if(e.target.closest('.option')){
                    }
                };
            }
           

    },
    //Xử lý render ra bài hát
    render: function(){
        const htmls=this.songs.map((song,index) => {
            return `
            <div class="song ${index===this.curentIndex ? 'active' : ''}" data-index = "${index}">
            <div class="thumb"
            style="background-image: url(${song.image})">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`
        });
        playlist.innerHTML = htmls.join('');
    },
    //Define các thuộc tính ( curentSong) để gọi dễ hơn
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get:function(){
                return this.songs[this.curentIndex];
            }
        })
    },
    // Hàm xử lý active bài hát hiện tại lên trong playlisst
    activeSong: function(){
        $('.song.active').classList.remove('active');
        $(`[data-index= "${this.curentIndex}"]`).classList.add('active');
    },
    // Hàm xử lý load bài hát hiện tại
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path; 
        
    },
    //Load config ra 
    loadConfig:function(){
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    //Hàm xử lý next
    nextSong: function(){
        this.curentIndex++;
        if(this.curentIndex>=this.songs.length){
            this.curentIndex =0;
        }
        this.loadCurrentSong();
    },
    //Hàm xử lý prev
    prevSong: function(){
        this.curentIndex--;
        if(this.curentIndex<0){
            this.curentIndex =this.songs.length-1;
        }
        this.loadCurrentSong();
        
    },
    //Hàm xử lý để cuộn bài hát theo bài hát đang active
    scroolToActiveSong:function(){
        setTimeout(function(){
            if(this.curentIndex>=2){
                $('.song.active').scrollIntoView(
                    {
                        behavior: "smooth",
                        block:"nearest"
                    }
                )
            }else{
                $('.song.active').scrollIntoView(
                    {
                        behavior: "smooth",
                        block:"center"
                    }
                )
            }
        },300)
    },
    //Hàm xử lý random bài hát
    randomSong: function(){
        let newIndex;
        do{
            newIndex = Math.floor(Math.random()*this.songs.length);
        }while(newIndex===this.curentIndex)
        this.curentIndex = newIndex;
        this.loadCurrentSong();
    },
    // Hàm chạy toàn bộ chương trình 
    start: function(){ 
        this.loadConfig();
        this.defineProperties();
        this.loadCurrentSong();
        this.render();
        this.handerEvents();

        // Load trạng thái ban đầu 
        randomBtn.classList.toggle('active',this.isRandom);
        repeatBtn.classList.toggle('active',this.isRepeat);
       
    },   
}
    app.start();
    