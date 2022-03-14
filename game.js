var length=100;
var bps=4;
var started=0;
var intervalnum;
var ypos;
var level="1100000000000000000000100000000000000000010000000000000000000000000000000000000000000000000000000000"+
          "0100000001000000000000000001100000000000000000000000000000000000000000000000000000000000000000000000"+
          "0001000000000010000000000100000000000000000000000000000000000000000000000000000000000000000000000000"+
          "0000000000000000000000000000000001100110000010000000000000000000000000000000000000000000000000000000";
if (localStorage.getItem("keyboard")){
  document.getElementById("keyboard").checked=eval(localStorage.getItem("keyboard"));
}
if (localStorage.getItem("cursor")){
  document.getElementById("cursorline").style.top=eval(localStorage.getItem("cursor"))+"px";
  ypos=eval(localStorage.getItem("cursor"));
}
if (localStorage.getItem("fps")){
  document.getElementById("fps").value=eval(localStorage.getItem("fps"));
}
for (var i=length; i>=1; i--){
  document.getElementById("playarea").innerHTML+="<tr><td id='"+(i)+"' onmousedown=clicked("+i+")></td><td id='"+(i+length)+"' onmousedown=clicked("+(i+length)+")></td><td id='"+(i+length*2)+"' onmousedown=clicked("+(i+length*2)+")></td><td id='"+(i+length*3)+"' onmousedown=clicked("+(i+length*3)+")></td></tr>"
}
for (i=1; i<=length*4; i++){
  if (level[i-1]==1){
    document.getElementById(i).style.backgroundColor="rgb(0, 204, 255)";
  }
}
function clicked(num){
  if (document.getElementById(num).style.backgroundColor=="rgb(0, 204, 255)"){
    document.getElementById(num).style.backgroundColor="white";
  } else {
    document.getElementById(num).style.backgroundColor="red";
    setTimeout(lose);
  }
}
function lose(){
  document.getElementById("result").innerHTML="You lose";
  done();
}
function win(){
  document.getElementById("result").innerHTML="You win!";
  done();
}
function done(){
  clearInterval(intervalnum);
  document.getElementById("result").style.fontSize=window.innerWidth/8-90+"px";
}
function next(){
  document.getElementById("playarea").style.bottom=Number(document.getElementById("playarea").style.bottom.slice(0,-2))-235/document.getElementById("fps").value*bps+"px";
  if (-document.getElementById("playarea").style.bottom.slice(0,-2)/235>=1 && -document.getElementById("playarea").style.bottom.slice(0,-2)/235<=length+1){
    if (document.getElementById(Math.floor(-document.getElementById("playarea").style.bottom.slice(0,-2)/235)).style.backgroundColor=="rgb(0, 204, 255)" ||
    document.getElementById(Math.floor(-document.getElementById("playarea").style.bottom.slice(0,-2)/235)+length).style.backgroundColor=="rgb(0, 204, 255)" ||
    document.getElementById(Math.floor(-document.getElementById("playarea").style.bottom.slice(0,-2)/235)+length*2).style.backgroundColor=="rgb(0, 204, 255)" ||
    document.getElementById(Math.floor(-document.getElementById("playarea").style.bottom.slice(0,-2)/235)+length*3).style.backgroundColor=="rgb(0, 204, 255)"){
      document.getElementById("playarea").style.bottom=235*Math.ceil(document.getElementById("playarea").style.bottom.slice(0,-2)/235)+"px";
      lose();
    }
  }
  if (-document.getElementById("playarea").style.bottom.slice(0,-2)/235>=length+10/235){
    win();
  }
}
function start(){
  if (started==0){
    intervalnum=setInterval(next,1000/document.getElementById("fps").value);
    started=1;
    document.getElementById("fps").disabled=true;
    document.getElementById("keyboard").disabled=true;
  }
}
function position(e){
  ypos=e.clientY;
}
function keydown(e){
  if (!e.repeat){
    if (e.key=="f"){
      start();
      clicked(Math.ceil((window.innerHeight-ypos-Number(document.getElementById("playarea").style.bottom.slice(0,-2)))/235));
    }
    if (e.key=="g"){
      start();
      clicked(Math.ceil((window.innerHeight-ypos-Number(document.getElementById("playarea").style.bottom.slice(0,-2)))/235)+length);
    }
    if (e.key=="h"){
      start();
      clicked(Math.ceil((window.innerHeight-ypos-Number(document.getElementById("playarea").style.bottom.slice(0,-2)))/235)+length*2);
    }
    if (e.key=="j"){
      start();
      clicked(Math.ceil((window.innerHeight-ypos-Number(document.getElementById("playarea").style.bottom.slice(0,-2)))/235)+length*3);
    }
  }
}
function beforestart(){
  if (document.getElementById("keyboard").checked){
    document.getElementById("cursorline").style.top=ypos+"px";
    document.getElementById("cursorline").style.visibility="visible";
  } else {
    document.getElementById("cursorline").style.visibility="hidden";
  }
  document.getElementById("fpsnum").innerHTML=document.getElementById("fps").value;
}
function save(){
  localStorage.setItem("keyboard",document.getElementById("keyboard").checked);
  localStorage.setItem("cursor",document.getElementById("cursorline").style.top.slice(0,-2));
  localStorage.setItem("fps",document.getElementById("fps").value);
}
intervalnum2=setInterval(beforestart,10);
intervalnum3=setInterval(save,1000);
window.addEventListener("mousemove",position);
