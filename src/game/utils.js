const TWO_PI = Math.PI * 2;
const PI_WIDTH = 128 / Math.PI;

import { GAME } from './const';

export function Clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function GetTextureRepeat(url, repeatX, repeatY, offsetX = 0, offsetY = 0) {
  const tex = new THREE.TextureLoader().load(url);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.offset.set(offsetX, offsetY);
  return tex;
}

export function GetTextureRepeatDefer(url, repeatX, repeatY, offsetX, offsetY) {
  return () => GetTextureRepeat(url, repeatX, repeatY, offsetX, offsetY);
}

/* Map 2D cartesian coords to cylindrical coords */
export function CartesianToCylinder(vec3, x, y, project = 0) {
  const theta = x / PI_WIDTH;
  const radius = GAME.CilynderRadius + project;
  vec3.x = radius * Math.sin(theta);
  vec3.y = y;
  vec3.z = radius * Math.cos(theta);
}

export function CylinderToCartesian(vec3) {
  const r = Math.sqrt(vec3.x * vec3.x + vec3.z * vec3.z);
  const theta = Math.atan2(vec3.x, vec3.z);

}

export function CartesianToCylindrical(vec3, radius, theta) {
  vec3.x = radius * Math.sin(theta);
  vec3.z = radius * Math.cos(theta);
  
}

export function AddDot(parent, position, size = 5) {
  const geo = new THREE.Geometry();
  geo.vertices.push(position.clone());
  const mat = new THREE.PointsMaterial({
    size,
    sizeAttenuation: false,
    color: 0xffffff,
  });
  const dot = new THREE.Points(geo, mat);
  parent.add(dot);
  return dot;
}
