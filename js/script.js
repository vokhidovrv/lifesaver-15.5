$(document).ready(function () {
    $('.start').addClass('active');
    $('#nickname').on('input',function(){
        if($(this).val()==''){
            $('#start_button').prop('disabled',true)
        }else{
            $('#start_button').removeAttr('disabled');
        }
    })
    $('#start_button').click(function(){
        setInterval(startTimer,1000);
        let nickname=$('#nickname').val();
        $('div').removeClass('active');
        $('.game').addClass('active');
        $('#name_player').html(nickname);
    
        game();
    })
    $('#restart').click(()=>{
        player.x=0;
        player.y=0;
        // player.step=0;
        game();
    })
});

let player={
    el:false,
    x:0,
    y:0,
    step:64,
    width:64,
    height:64
};
let score=0;

function game() {

    $('.game_zone').append(`<div class="" id="player" style="top:${player.y}px;left:${player.x}px"></div>`);
    player.el=document.getElementById('player');
    generateLvl();
    intervals();
    controller();
}
function controller(e){
    $(document).keydown(function (e) { 
        switch (e.keyCode) {
            case 87:
            if(player.y>16){
                player.y-=player.step;
                player.el.style.top=`${player.y}px`
               
            } 
            
            break;           
            //  Вниз
            case 83:

                if(player.y<gameZone.getBoundingClientRect().height-player.height*2.5){
                    player.y += player.step;
                    player.el.style.top = `${player.y}px`;
                }
                break;

            //Влево
            case 65:
                if(player.x>0){
                    player.x-=player.step;
                    player.el.style.left=`${player.x}px` 
                }
               
                break;
            //Право
            case 68:
                if(player.x<gameZone.getBoundingClientRect().right-player.width){
                    player.x+=player.step;
                    player.el.style.left=`${player.x}px`

                }
                break;   
        }
    });
}
function generateLvl() { 
    let xx=Math.round((gameZone.getBoundingClientRect().height-player.height)/64);
    let yy=Math.round((gameZone.getBoundingClientRect().width-player.height)/64)+1;
    var lvl=generateField(xx,yy)
    setHeart(lvl);
    setStone(lvl);
    setLvl(lvl);
    for (let index = 0; index < lvl.length; index++) {
       
    }
}

function generateField(cols,rows){
    var lvl=[];
    let id=0;
    for (let index = 0; index <cols*rows; index++) {
        lvl.push([{
            id_field:id++,
            type:'field'
        }])
    }
    return lvl;
}
function setHeart(lvl){
    for (let i = 0; i < 10; i++) {
        var ran=Math.floor(Math.random()*lvl.length+1)-1;
        if(lvl[ran][0].type=='field'){
            lvl[ran][0].type='heart';
        }else{
            i--;
        }
    }
}
function setStone(lvl){
    for (let i = 0; i < 50; i++) {
        var ran=Math.floor(Math.random()*lvl.length+1)-1;
        if(lvl[ran][0].type=='field'){
            lvl[ran][0].type='stone';
        }else{
            i--;
        }
    }
}
function setLvl(lvl) {
    for (let index = 0; index <lvl.length; index++) {
        if(lvl[index][0].type=='field'){
            $('.game_zone').append(`<img src="img/ground.png" class="field" alt="">`);
        }
        else if(lvl[index][0].type=='heart'){
            $('.game_zone').append(`<img src="img/heart-in-stone.svg" class="heart" alt="">`);
        }
        else if(lvl[index][0].type=='stone'){
            $('.game_zone').append(`<img src="img/stone.png" class="stone" alt="">`);  
        }
    }
}
function intervals() {
    let block=setInterval(()=>{
        let hearts=document.querySelectorAll('.heart');
        hearts.forEach((heart)=>{
            const playerPosTop = player.el.getBoundingClientRect().top,
                playerPosRight = player.el.getBoundingClientRect().right,
                playerPosBottom = player.el.getBoundingClientRect().bottom,
                playerPosLeft = player.el.getBoundingClientRect().left,
                heartPosTop = heart.getBoundingClientRect().top,
                heartPosRight = heart.getBoundingClientRect().right,
                heartPosBottom = heart.getBoundingClientRect().bottom,
                heartPosLeft = heart.getBoundingClientRect().left;
                
            if (
                playerPosTop < heartPosBottom &&
                playerPosBottom > heartPosTop &&
                playerPosRight > heartPosLeft &&
                playerPosLeft < heartPosRight
            ) {
                heart.src='img/ground.png';
                heart.classList.remove('heart');
                score++;
            }

        })
        // let stones=document.querySelectorAll('.stone');
        // stones.forEach((stone)=>{
        //     const playerPosTop = player.el.getBoundingClientRect().top,
        //         playerPosRight = player.el.getBoundingClientRect().right,
        //         playerPosBottom = player.el.getBoundingClientRect().bottom,
        //         playerPosLeft = player.el.getBoundingClientRect().left,
        //         stonePosTop = stone.getBoundingClientRect().top,
        //         stonePosRight = stone.getBoundingClientRect().right,
        //         stonePosBottom = stone.getBoundingClientRect().bottom,
        //         stonePosLeft = stone.getBoundingClientRect().left;
                
        //     if (
        //         playerPosTop < stonePosBottom &&
        //         playerPosBottom > stonePosTop &&
        //         playerPosRight > stonePosLeft &&
        //         playerPosLeft < stonePosRight
        //     ) {
        //         player.x-=player.step;
        //         player.y-=player.step;
        //         player.el.style.top=`${player.y}px`
        //         player.el.style.left=`${player.x}px`
        //     }

        // })

        $('#score_heart').html(score+"/10")
    },1000/60)
    let endgame=setInterval(()=>{
        if(score==10){
            alert('Ты выиграл');
            location.reload();
            score=0;
        }
    },1000/60)
}


let second=00,
    minute=00;
function startTimer(){
    second++;
    if(second<=9){
       second="0"+second;
      
    }
    
    if(second==60){
        minute++;
        second="0"+0;
    }
    time=minute+":"+second;
    $('#timer').html(time);
}
let gameZone=document.querySelector('.game_zone');