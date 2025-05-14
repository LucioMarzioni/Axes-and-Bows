export default class Tuto extends Phaser.Scene {
    constructor() {
      super("Tuto");
    }
    init() {
      this.tuto1 = true
    }

    preload() {
    this.load.image("TutoU", "./public/TutoU.png");
    this.load.image("TutoD", "./public/TutoD.png");  
    }

    async create() {
      this.TutoD = this.add.image(510, 300, "TutoD").setScale(0.9).setInteractive()
      this.TutoU = this.add.image(510, 300, "TutoU").setScale(0.9).setInteractive()

const idioma = this.registry.get('idiomaActual') || 'es';
const textoBase = 'Derrota a todos los enemigos para pasar de nivel';        
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

    this.add.text(100, 15, textoTraducido, {
      fontFamily: "Arial",
      fontSize: '32px',
      color: '#000000',
      padding: { x: 10, y: 5 }
    });



      this.TutoU.on("pointerdown", () =>{
        this.TutoU.destroy()
        this.time.delayedCall(300, () => {
        this.tuto1 = false 
      })
    })

    this.TutoD.on("pointerdown", () =>{
      this.scene.start("GameCop")
    })

    }

    update() {
    }
}