import GameMetaMaterial from './meta-material';

export default class CollectibleTrailMaterial extends GameMetaMaterial {
  constructor(opts) {
    super({
      nodeName: opts.name,
      low: {
        type: 'MeshLineMaterial',
        args: {
          color: new THREE.Color(opts.color),
          side: THREE.DoubleSide,
          sizeAttenuation: true,
          lineWidth: opts.lineWidth,
        },
      },
    });
  }
}
