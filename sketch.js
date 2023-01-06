//variaveis da bolinha:
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

//variaveis da velocidade:
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//variaveis das raquetes:
let xRaquete1 = 5;
let yRaquete1 = 150;
let xRaquete2 = 585;
let yRaquete2 = 150;
let comprimento = 10;
let altura = 90;
let velocidadeRaquete2;

//variável da colisão:
let colidiu = false;

//variáveis do placar:
let meusPontos = 0;
let pontosOponente = 0;

//variáveis do som:
let trilha;
let raquetada;
let ponto;



function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete1,yRaquete1);
  mostraRaquete(xRaquete2,yRaquete2);
  movimentaRaquete1();
  movimentaRaquete2();
  colisao(xRaquete1,yRaquete1);
  colisao(xRaquete2,yRaquete2);
  placar();
  
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBolinha(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x,y,comprimento,altura);
}

function movimentaRaquete1(){
  if(keyIsDown(UP_ARROW)){
    yRaquete1 -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete1 += 10;
  }
}

function movimentaRaquete2(){
  velocidadeRaquete2 = yBolinha - yRaquete2 - comprimento/2 - 30;
  yRaquete2 += velocidadeRaquete2;
}

function colisao(x,y){
  colidiu = collideRectCircle(x,y,comprimento,altura,xBolinha,yBolinha,raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos,170,26);
  fill(color(255,140,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosOponente,470,26);
  if(xBolinha > 592.5){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 7.5){
    pontosOponente +=1;
    ponto.play();
  }
}

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}
