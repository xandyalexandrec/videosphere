/* eslint-env browser */
import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'

const width  = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const video = document.createElement('video')
video.autoplay = true
video.src = 'https://streams.kolor.com/streams/833ec36d-b115-43a2-bbf1-aaca49046bab/source.02-720p_HD.mp4'
video.crossOrigin = ''

const videoTexture = new THREE.Texture(video)
videoTexture.minFilter = THREE.LinearFilter
videoTexture.magFilter = THREE.LinearFilter
videoTexture.format = THREE.RGBFormat

const scene = new THREE.Scene()

const cubeGeometry = new THREE.SphereGeometry(500, 60, 40)
const sphereMat = new THREE.MeshBasicMaterial({map: videoTexture})
sphereMat.side = THREE.BackSide
const cube = new THREE.Mesh(cubeGeometry, sphereMat)

scene.add(cube)

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 0;
camera.position.z = 500;

scene.add(camera)

const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = false
controls.maxDistance = 500
controls.minDistance = 500


function render() {
      if(video.readyState === video.HAVE_ENOUGH_DATA){
        videoTexture.needsUpdate = true
      }
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(render)
}

render()

