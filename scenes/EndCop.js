export default class EndCop extends Phaser.Scene {
    constructor() {
      super("EndCop");
    }

    init(data){
    this.score = data.score
    }

    preload() {
        this.load.image("fondo3", "./public/fondo3.png"); 
        this.load.image("boton", "./public/boton.png");   
    }
    async create(){
        this.fondo3 = this.add.image(500, 300, "fondo3").setScale(0.45)
        this.boton2 = this.add.image(500, 500, "boton").setScale(1.5).setInteractive();

const idioma = this.registry.get('idiomaActual') || 'es';
const textoBase = 'Victoria';
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

    this.add.text(380, 475, textoTraducido2, {
      fontFamily: "Arial",
      fontSize: '32px',
      color: '#000000',
      padding: { x: 10, y: 5 }
    });



    this.boton2.setInteractive();
    this.boton2.on("pointerdown", () =>{
      this.scene.start("main");
    })

    this.scoreText = this.add.text(430,300,`${this.score}`, {fontSize: "32px" , fontFamily: "Arial",})    
    this.arquero.x = 430;
    this.barbaro.x = 570;

    }

}