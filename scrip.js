const board = document.getElementById("board");

let posisi = 1;

// Ular
const snakes = {
    98:79,
    95:75,
    70:55,
    52:42,
    25:5
};

// Tangga
const ladders = {
    4:14,
    9:31,
    21:42,
    28:84,
    51:67,
    72:91
};

function buatBoard(){
    board.innerHTML="";
    for(let i=100;i>=1;i--){
        let cell=document.createElement("div");
        cell.className="cell";
        cell.id="c"+i;
        cell.innerHTML=i;
        board.appendChild(cell);
    }
    gambarPlayer();
}

function gambarPlayer(){
    document.querySelectorAll(".player").forEach(e=>e.remove());

    let p=document.createElement("div");
    p.className="player";
    document.getElementById("c"+posisi).appendChild(p);

    document.getElementById("status").innerHTML="Posisi: "+posisi;
}

function rollDice(){

    let dadu=Math.floor(Math.random()*6)+1;

    document.getElementById("dice").innerHTML="Dadu: "+dadu;

    posisi+=dadu;

    if(posisi>100) posisi=100;

    if(snakes[posisi]){
        alert("🐍 Digigit ular!");
        posisi=snakes[posisi];
    }

    if(ladders[posisi]){
        alert("🪜 Naik tangga!");
        posisi=ladders[posisi];
    }

    gambarPlayer();

    if(posisi===100){
        alert("🎉 Selamat! Kamu Menang!");
        posisi=1;
        gambarPlayer();
    }
}

buatBoard();