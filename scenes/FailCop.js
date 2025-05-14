export default class FailCop extends Phaser.Scene {
    constructor() {
      super("FailCop");
    }

    init(){
    }

    preload() {
        this.load.image("fondo3", "./public/fondo3.png"); 
        this.load.image("boton", "./public/boton.png");   
    }
    async create(){
        this.fondo3 = this.add.image(500, 300, "fondo3").setScale(0.45)
        this.boton = this.add.image(500, 300, "boton").setScale(1.5).setInteractive();
        this.boton2 = this.add.image(500, 500, "boton").setScale(1.5).setInteractive();

const idioma = this.registry.get('idiomaActual') || 'es';
const textoBase = 'Derrota';
const textoBase2 = 'Reanudar';
const textoBase3 = 'Abandonar';        
let textoTraducido = textoBase;
let textoTraducido2 = textoBase2;
let textoTraducido3 = textoBase3;

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

    this.add.text(380, 50, textoTraducido, {
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

    this.add.text(420, 280, textoTraducido2, {
      fontFamily: "Arial",
      fontSize: '32px',
      color: '#000000',
      padding: { x: 10, y: 5 }
    });

if (idioma !== 'es') {
      try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyCZjoidZzGye02no-ww4SV865CRVUhQP4Q`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: textoBase3,
            source: 'es',
            target: idioma,
            format: 'text'
          })
        });

        const data = await response.json();
        textoTraducido3 = data.data.translations[0].translatedText;
      } catch (e) {
        console.error('Error traduciendo:', e);
      }
    }

    this.add.text(420, 475, textoTraducido3, {
      fontFamily: "Arial",
      fontSize: '32px',
      color: '#000000',
      padding: { x: 10, y: 5 }
    });




    this.boton.setInteractive();
    this.boton.on("pointerdown", () =>{
      this.scene.start("GameCop");
    })

    this.boton2.setInteractive();
    this.boton2.on("pointerdown", () =>{
      this.scene.start("main");
    })
    }
}