export default class LvlSelect extends Phaser.Scene {
    constructor() {
      super("LvlSelect");
    }
    init() {   
    }
    preload() {
    this.load.image("fondo2", "./public/Fondo2.png");
    this.load.image("boton", "./public/boton.png");   
    }


    async create() {
    this.fondo1 = this.add.image(500, 300, "fondo2").setScale(0.435)
    this.boton = this.add.image(500, 300, "boton").setScale(1.5).setInteractive();
    this.boton2 = this.add.image(500, 500, "boton").setScale(1.5).setInteractive();


    const idioma = this.registry.get('idiomaActual') || 'es';
    const textoBase = 'Cooperativo';
    const textoBase2 = 'Competitivo';
    const textoBase3 = 'Selecciona un modo de juego';

    let textoTraducido = textoBase;

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

    this.add.text(405, 275, textoTraducido, {
      fontFamily: "Arial",
      fontSize: '32px',
      color: '#000000',
      padding: { x: 10, y: 5 }
    });
  
    let textoTraducido2 = textoBase2;

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

    this.add.text(405, 475, textoTraducido2, {
      fontFamily: "Arial",
      fontSize: '32px',
      color: '#000000',
      padding: { x: 10, y: 5 }
    });

let textoTraducido3 = textoBase3;

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

    this.add.text(40, 60, textoTraducido3, {
      fontFamily: "Arial",
      fontSize: '64px',
      color: '#000000',
      padding: { x: 40, y: 5 }
    });




    this.boton.setInteractive();
    this.boton.on("pointerdown", () =>{
      this.scene.start("Tuto");
    })

    this.boton2.setInteractive();
    this.boton2.on("pointerdown", () =>{
      this.scene.start("GameVS");
    })

    }
    update() {
    }
}