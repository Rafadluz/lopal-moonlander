//Moonlander. Um jogo de alunissagem
//Rafaela da Luz (https://github.com/Rafadluz)
//28/3/2025


/**@type {HTMLCanvasElement}*/

//Seção de Modelagem de dados
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let x
let velocidadeX;
let angulo;

if(Math.round(Math.random()) == 0){
    x = 100;
    velocidadeX = 2
    angulo = -Math.PI/2
}else{
    x = 700
    velocidadeX = -2
    angulo = Math.PI/2   
}


let moduloLunar = {
    posicao: {
        x: 100,
        y: 100
    },
    angulo: angulo,
    largura: 20,
    altura: 20,
    cor:"lightgray",
    motorLigado: false,
    velocidade: {
        x: velocidadeX,
        y: 0
    },
    combustivel: 1000,
    rotacaoAntiHorario : false,
    rotacaoHorario : false
}

let estrelas = [];
for(let i = 0; i < 500; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(Math.random() * 2),
        trasparencia: 1.0,
        diminuicao: true,
        razaoDeCintilacao: Math.random() * 0.05
    }
}

//Seção de visualização
function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();

        if(moduloLunar.motorLigado){
            desenharChama();
        }
        
    contexto.restore();
}

function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 20)
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

function mostrarVelocidade(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade Vertical: ${(10 * moduloLunar.velocidade.y).toFixed(1)}`;
    contexto.fillText(velocidade, 120, 60)
}

function mostrarVelocidadeHo(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade Horizontal: ${(10 * moduloLunar.velocidade.x).toFixed(1)}`;
    contexto.fillText(velocidade, 120, 80);
}

function mostrarAngulo(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Angulo: ${(10 * moduloLunar.angulo).toFixed(1)}` + "°";
    contexto.fillText(velocidade, 400, 60);
}

function mostrarAltitude() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
 
    let altitude = `Altitude: ${(canvas.height - moduloLunar.posicao.y).toFixed(2)} m`;
    contexto.fillText(altitude, 400, 80);
}

function mostrarCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let combustivel = `Combustível: ${(moduloLunar.combustivel).toFixed(0)}`;
    contexto.fillText(combustivel, 120, 100);
}

function desenharEstrelas(){
    for(let i = 0 ; i < estrelas.length; i++){
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = "rgba(255, 255, 255, " + estrela.trasparencia + ")";
        contexto.fill();
        contexto.restore();
    }
}

function desenhar(){

    contexto.clearRect(0, 0, canvas.width, canvas.height);

    desenharEstrelas()
    mostrarAltitude();
    mostrarAngulo();
    mostrarVelocidadeHo();
    semCombustivel();
    mostrarCombustivel();
    mostrarVelocidade();
    atracaoGravitacional();
    desenharModuloLunar();
    //essa função repete a execução da função desenhar a cada quadro
    if(moduloLunar.posicao.y >= (canvas.height -0.5 * moduloLunar.altura)){
        if(moduloLunar.velocidade.y >= 0.5 || moduloLunar.velocidade.x != 0 || 5< moduloLunar.angulo|| moduloLunar.angulo< - 5 ){
            contexto.font = "bold 100px Arial";
            contexto.textAlign = "center";
            contexto.textBaseline = "middle";
            contexto.fillStyle = "red";
            return contexto.fillText("Você morreu!", 400, 300);
    }else{
        contexto.font = "bold 100px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "red";
        return contexto.fillText("Você ganhou!", 400, 300)
    }}
    requestAnimationFrame(desenhar);

}

//Seção de controle
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorLigado = true;
        moduloLunar.combustivel = Math.max(0, moduloLunar.combustivel - 1);
    }
    else if (evento.keyCode == 39) {
       moduloLunar.rotacaoAntiHorario = true;

    }
    else if (evento.keyCode == 37) {
        moduloLunar.rotacaoHorario = true;

    }
}

document.addEventListener("keyup", teclaSolta);
function teclaSolta(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorLigado = false;
    }
    else if (evento.keyCode == 39) {
     moduloLunar.rotacaoAntiHorario = false
    }
    else if (evento.keyCode == 37) {
       moduloLunar.rotacaoHorario = false
    }
}

function semCombustivel(){
    if(moduloLunar.combustivel == 0){
        moduloLunar.motorLigado = false
    }
}

let gravidade = 0.05;
function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if(moduloLunar.rotacaoAntiHorario){
        moduloLunar.angulo += Math.PI/180;
    }else if(moduloLunar.rotacaoHorario){
        moduloLunar.angulo -= Math.PI/180;
    }
    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.0115 * Math.cos(moduloLunar.angulo);
        moduloLunar.velocidade.x += 0.0115 * Math.sin(moduloLunar.angulo);
    }
    
    moduloLunar.velocidade.y += gravidade;


}
desenhar();