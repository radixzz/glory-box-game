import GameMetaMaterial from './meta-material';
import { StaticInstance as Skybox } from '../skybox';

export default class CollectibleSocketMaterial extends GameMetaMaterial {
  constructor(opts) {
    super({
      nodeName: opts.name,
      low: {
        type: 'MeshBasicMaterial',
        args: {
          color: opts.color,
        },
      },
      medium: {
        type: 'MeshLambertMaterial',
        args: {
          envMap: Skybox.textureCube,
          reflectivity: 0.35,
          color: opts.color,
        },
      },
    });
  }
}
