var map_numto_col={1:"green",2:"red",3:"yellow",4:"blue"}
var map_colto_num={"green":1,"red":2,"yellow":3,"blue":4}
arr=[]
user_arr=[]
var running=false;
var level=0;
var currentnum=-1;
$(document).on("keypress",function(event){
  if (running==false){
    generateSequence();
    running=true;
  }
})

// Every clicking on button, leads to checking(by keeping a count of the current time the number is being clicked)
$(".btn").click(function(){
  if (running==true){
    currentnum++;
    var color=$(this).attr("id");
    var pressed_num=map_colto_num[color];
    user_arr.push(pressed_num);
    play_sound(pressed_num);
    animate_button(pressed_num);
    console.log(user_arr[currentnum],arr[currentnum],currentnum,arr.length);
    if (user_arr[currentnum]==arr[currentnum]){
      if (currentnum==arr.length-1){
        console.log('Next level');
        setTimeout(function(){
          generateSequence()
        },1000)
      }
  }
  else{
    var audio= new Audio("sounds//wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },300)
    newgame()
  }
  }
})
// New game
function newgame(){
    $("#level-title").text("Game over, press any key to continue");
    running=false;
    level=0;
    currentnum=-1;
    user_arr=[]
    arr=[]
}
// Generate Sequence
function generateSequence(){
  level++;
  user_arr=[]
  currentnum=-1;
  $("#level-title").text("Level "+level);
  var num=Math.floor(Math.random()*4+1);
  play_sound(num);
  animate_button(num);
  arr.push(num);
}
// Play sound
function play_sound(num){
  var audio= new Audio("sounds//"+map_numto_col[num]+".mp3");
  audio.play();
}
// Play animation
function animate_button(num){
  id_name=map_numto_col[num];
  $("#"+id_name).addClass("pressed");
  setTimeout(function(){
      $("#"+id_name).removeClass("pressed");
  },150);
}
