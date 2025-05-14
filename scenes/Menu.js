import { auth } from "../Firebase/firebaseConfig.js"; 
import { signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
export default class Menu extends Phaser.Scene {
    constructor() {
      super("main");
    }
    init() {   
      this.idioma = 1

    }
    preload() {
    this.load.image("fondo1", "./public/Fondo1.png");
    this.load.image("logo", "./public/Logo.png");
    this.load.image("boton", "./public/boton.png");  
    this.load.image("usa", "./public/usa.png");   
    this.load.image("arg", "./public/arg.png");  
    this.load.image("bra", "./public/bra.png");  
    }
    create() {
signInAnonymously(auth)
  .then(() => {
    console.log("Jugador autenticado anónimamente.");
  })
  .catch((error) => {
    console.error("Error de autenticación:", error.code, error.message);
  });

    this.fondo1 = this.add.image(500, 300, "fondo1").setScale(0.35)
    this.logo = this.add.image(500, 200, "logo").setScale(1.5)  
    this.boton = this.add.image(500, 450, "boton").setInteractive();

    this.apiKey = 'AIzaSyCZjoidZzGye02no-ww4SV865CRVUhQP4Q'; 
    this.textoBase = 'Jugar';
    this.sourceLang = 'es';
 
    this.botonJugar = this.add.text(450, 425, this.textoBase, {
      fontFamily: "Arial",
      fontSize: '32px',
      color: '#000000',
      padding: { x: 10, y: 5 }
    })
    .setInteractive()
    .on("pointerdown", () =>{
      this.scene.start("LvlSelect");
      //this.scene.start("GameCop2");
    })

    // Botones de idioma
    //this.add.text(50, 300, 'Español', this.estiloBoton())
    this.arg = this.add.image(950, 390, "arg")
      .setScale(0.1)
      .setInteractive()
      .on('pointerdown', () => this.cambiarIdioma('es'))

    this.usa = this.add.image(950, 470, "usa")
      .setScale(0.1)
      .setInteractive()
      .on('pointerdown', () => this.cambiarIdioma('en'))

    this.bra = this.add.image(950, 550, "bra")
      .setScale(0.1)
      .setInteractive()
      .on('pointerdown', () => this.cambiarIdioma('pt'))
      
  }


  async cambiarIdioma(targetLang) {
    this.registry.set('idiomaActual', targetLang); // ← Guardamos el idioma globalmente
    if (targetLang === 'es') {
      this.botonJugar.setText(this.textoBase);
      return;
    }

    try {
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: this.textoBase,
          source: this.sourceLang,
          target: targetLang,
          format: 'text'
        })
      });

      const data = await response.json();
      const traducido = data.data.translations[0].translatedText;
      this.botonJugar.setText(traducido);
    } catch (error) {
      console.error('Error al traducir:', error);
    }
  
    

    if (targetLang === 'es') {
    this.botonJugar.setText(this.textoBase);
    return;
  }
    

    this.boton.setInteractive();
    this.boton.on("pointerdown", () =>{
      this.scene.start("LvlSelect");
      //this.scene.start("EndCop");
    })
    }
  

    update() {
    }

    

}