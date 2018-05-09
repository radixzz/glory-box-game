
/*
  TODO:
    - ✓ Fix: player trail erasing
    - ✓ Fix: map offset x
    - ✓ Fix: dynamic platform should follow players position
    - ✓ Feat: Platform weight effect when player is grounded
    - Feat: Player falling on sides should generate friction and be able to jump
    - Feat: Shake effect
    - Feat: Desintegration and reintegration of player
    - Feat: Player lobby with random freebies and initial impulse
    - Feat: Audio Effects on Jump
    - Feat: Initial audio atmosphere for lobby and transition to full audio when player starts
    - Feat: Player rotation when walking and jumping
    - Feat: Collectibles
    - Feat: Game Menu with (start, audio, quality selector, logo and instructions)
    - Feat: Game HUD
    - Feat: Danger pressure from bottom
    - Feat: Background geometry on center
    - Feat: Background geometry on sides
    - Feat: Teasing audio effects
    - Feat: Leveling
    - Feat: Obstacles ()
    - Feat: Powerups (impulsers, shields)
    - Feat: Illumination and vignette effect
*/
import { CONFIG, GAME } from './game/const';
import Engine from './game/engine';
import GameTools from './game/tools';
import GameInput from './game/input';
import GamePhysics from './game/physics';
import GamePlayer from './game/player';
import GameMap from './game/map';

class Game {
  constructor() {
    this.init(true);
    this.updateSize();
    this.onFrameListener = this.onFrame.bind(this);
    this.onFrame();
  }

  init() {
    this.clock = new THREE.Clock();
    this.gameInput = new GameInput();
    this.engine = new Engine({
      canvas: document.body.querySelector('#js-canvas'),
    });
    this.player = new GamePlayer({});
    this.map = new GameMap({});
    this.physics = new GamePhysics({
      bounds: new THREE.Box2(
        new THREE.Vector2(GAME.BoundsLeft, GAME.BoundsTop),
        new THREE.Vector2(GAME.BoundsRight, GAME.BoundsBottom)),
    });
    this.physics.add(this.player.body);
    this.physics.add(this.map.bodies);
    this.engine.scene.add(this.player.group);
    this.engine.scene.add(this.map.group);
    this.engine.cameraTarget = this.player.mesh.position;
    this.attachEvents();
    CONFIG.EnableTools && this.addTools();
    CONFIG.EnableStats && this.addStats();
  }

  addStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.domElement);
  }

  addTools() {
    const tools = new GameTools();
    tools.addScreen(this.physics, 'physics');
    tools.addScreen(this.engine, 'engine');
    tools.addScreen(this.player, 'player');
    tools.addScreen(this.map, 'map');
  }

  attachEvents() {
    window.addEventListener('resize', this.updateSize.bind(this));
  }

  updateSize() {
    const { innerWidth: w, innerHeight: h } = window;
    this.engine.resize(w, h);
  }

  onFrame() {
    const { stats, clock, gameInput, player, physics, engine, map } = this;
    stats && stats.begin();
    const delta = clock.getDelta();
    player.update(delta, gameInput.state);
    map.update(delta, player);
    physics.updateCollisionSpace(player.body.position, 15);
    physics.update(delta);
    engine.updateObjectCulling(player.mesh.position);
    engine.render();
    stats && stats.end();
    requestAnimationFrame(this.onFrameListener);
  }
}

window.game = new Game();
