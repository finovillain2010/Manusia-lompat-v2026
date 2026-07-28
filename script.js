// ===============================
// GAME ULAR TANGGA
// ===============================

const board = document.getElementById("board");
const dice = document.getElementById("dice");
const button = document.getElementById("rollButton");
const turnText = document.getElementById("turn");
const log = document.getElementById("log");
const p1Text = document.getElementById("p1-position");
const p2Text = document.getElementById("p2-position");

let currentPlayer = 1;

const players = [
    { name: "Pemain 1", color: "red", position: 1 },
    { name: "Pemain 2", color: "blue", position: 1 }
];

// ===============================
// ULAR DAN TANGGA
// ===============================

const snakes = {
    99:80,
    95:75,
    92:88,
    83:19,
    73:53,
    69:33,
    64:36,
    59:17,
    55:7,
    48:9
};

const ladders = {
    2:38,
    7:14,
    8:31,
    15:26,
    21:42,
    28:84,
    36:44,
    51:67,
    71:91,
    78:98
};

// ===============================
// MEMBUAT PAPAN
// ===============================

function createBoard(){

    board.innerHTML="";

    for(let i=100;i>=1;i--){

        const cell=document.createElement("div");

        cell.className="cell";

        cell.id="cell-"+i;

        cell.innerHTML="<span>"+i+"</span>";

        board.appendChild(cell);

    }

    drawPlayers();

}

// ===============================
// GAMBAR PION
// ===============================

function drawPlayers(){

    document.querySelectorAll(".playerToken").forEach(token=>token.remove());

    players.forEach(player=>{

        const cell=document.getElementById("cell-"+player.position);

        if(cell){

            const token=document.createElement("div");

            token.className="playerToken "+player.color;

            cell.appendChild(token);

        }

    });

}

// ===============================
// LEMPAR DADU
// ===============================

button.onclick=function(){

    const value=Math.floor(Math.random()*6)+1;

    dice.innerHTML=value;

    movePlayer(value);

};

// ===============================
// GERAK PEMAIN
// ===============================

function movePlayer(step){

    let player=players[currentPlayer-1];

    if(player.position+step<=100){

        player.position+=step;

    }

    addLog(player.name+" mendapat angka "+step);

    if(ladders[player.position]){

        addLog("🪜 "+player.name+" naik tangga!");

        player.position=ladders[player.position];

    }

    if(snakes[player.position]){

        addLog("🐍 "+player.name+" digigit ular!");

        player.position=snakes[player.position];

    }

    updateText();

    drawPlayers();

    if(player.position===100){

        setTimeout(()=>{

            alert("🏆 "+player.name+" MENANG!");

            button.disabled=true;

        },200);

        return;

    }

    currentPlayer=currentPlayer===1?2:1;

    turnText.innerHTML="Giliran Pemain "+currentPlayer;

}

// ===============================
// UPDATE POSISI
// ===============================

function updateText(){

    p1Text.innerHTML="Posisi : "+players[0].position;

    p2Text.innerHTML="Posisi : "+players[1].position;

}

// ===============================
// RIWAYAT
// ===============================

function addLog(text){

    const p=document.createElement("p");

    p.innerHTML=text;

    log.prepend(p);

}

// ===============================
// RESET GAME
// ===============================

function resetGame(){

    players[0].position=1;

    players[1].position=1;

    currentPlayer=1;

    button.disabled=false;

    turnText.innerHTML="Giliran Pemain 1";

    log.innerHTML="";

    updateText();

    drawPlayers();

}

// ===============================

createBoard();

updateText();