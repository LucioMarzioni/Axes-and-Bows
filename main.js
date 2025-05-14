import GameVS from "./scenes/GameVS.js";
import Menu from "./scenes/Menu.js";
import EndVS from "./scenes/EndVS.js";
import EndCop from "./scenes/EndCop.js";
import LvlSelect from "./scenes/LvlSelect.js";
import GameCop from "./scenes/GameCop.js";
import GameCop2 from "./scenes/GameCop2.js";
import Tuto from "./scenes/Tuto.js";
import FailCop from "./scenes/FailCop.js";



// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1000,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 900 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Menu, GameVS, EndVS, LvlSelect, GameCop, Tuto, GameCop2, FailCop, EndCop],
};
// Create a new Phaser game instance
window.game = new Phaser.Game(config);
