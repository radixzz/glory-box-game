import GameMetaMaterial from '@/game/materials/meta-material';

export default class PlayerMaterial extends GameMetaMaterial {
  constructor(opts) {
    super({
      nodeName: opts.name,
      low: {
        type: 'MeshBasicMaterial',
        args: {
          color: opts.color,
        },
      },
    });
  }
}
