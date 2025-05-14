import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "../Firebase/firebaseConfig.js";
export default class EndVS extends Phaser.Scene {
    constructor() {
      super("EndVS");
    }

    init(data) {
     this.jugador1 = "player1";
     this.jugador2 = "player2";
     this.score2 = data.score2;
     this.score1 = data.score1;
    }

    preload() {
    this.load.image("fondo3", "./public/fondo3.png"); 
    this.load.image("boton", "./public/boton.png"); 
    this.load.image("arquero", "./public/ArqueroDown.png");
    this.load.image("barbaro", "./public/BarbaroDown.png");  
    }


    async create(){
        this.fondo3 = this.add.image(500, 300, "fondo3").setScale(0.45)
        this.arquero = this.add.image(-500, 300, "arquero").setScale(0.5) 
        this.barbaro = this.add.image(-500, 300, "barbaro").setScale(0.5)
        this.boton = this.add.image(500, 500, "boton").setInteractive();

  console.log("Puntajes a guardar:", this.score1, this.score2);
        await setDoc(doc(db, "puntuaciones", "jugadores"), {
  jugador1: this.score1,
  jugador2: this.score2
   });
       
        const score1 = this.registry.get('score1') || 0;
        const score2 = this.registry.get('score2') || 0;
        

  
this.scoreText2 = this.add.text(660,300,`${this.score2}`, {fontSize: "32px" , fontFamily: "Arial",})
this.scoreText1 = this.add.text(300,300,`${this.score1}`, {fontSize: "32px" , fontFamily: "Arial",})
this.barbaro.x = 570;    
this.arquero.x = 430; 
           


    // Guardar en Firebase usando IDs simples
    window.guardarPuntaje('jugador1_id', 'jugador1', score1);
    window.guardarPuntaje('jugador2_id', 'jugador2', score2);


const idioma = this.registry.get('idiomaActual') || 'es';
const textoBase = 'Ganador';        
const textoBase2 = 'Volver al menu';
let textoTraducido = textoBase;
let textoTraducido2 = textoBase2;

    if (idioma !== 'es') {
      try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyCZjoidZzGye02no-ww4SV865CRVUhQP4Q`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: textoBase,
            source: 'es',
            target: idioma,
            format: 'text'
          })
        });

        const data = await response.json();
        textoTraducido = data.data.translations[0].translatedText;
      } catch (e) {
        console.error('Error traduciendo:', e);
      }
    }

    this.add.text(370, 70, textoTraducido, {
      fontFamily: "Arial",
      fontSize: '64px',
      color: '#ffffff',
      padding: { x: 10, y: 5 }
    });

    if (idioma !== 'es') {
      try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyCZjoidZzGye02no-ww4SV865CRVUhQP4Q`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: textoBase2,
            source: 'es',
            target: idioma,
            format: 'text'
          })
        });

        const data = await response.json();
        textoTraducido2 = data.data.translations[0].translatedText;
      } catch (e) {
        console.error('Error traduciendo:', e);
      }
    }

    this.add.text(380, 475, textoTraducido2, {
      fontFamily: "Arial",
      fontSize: '32px',
      color: '#000000',
      padding: { x: 10, y: 5 }
    });



        this.boton.setInteractive();
        this.boton.on("pointerdown", () =>{
        this.scene.start("main");
        })
        
       
    }

    update() {
 

       

    }


  
}