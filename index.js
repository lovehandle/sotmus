var urls = {
  "cfa" : "http://codeforamerica.org",
  "voxeljscom": "http://voxeljs.com/",
  "blockplot": "https://github.com/maxogden/blockplot",
  "osm": "http://localhost:8080",
  "voxelcreator": "http://voxel-creator.jit.su/",
  "minecraft": "https://minecraft.net/",
  "three": "http://threejs.org/",
  "wut1": "http://gameplaceftw.files.wordpress.com/2013/03/2.jpg?w=640&h=492",
  "wut2": "http://gameplaceftw.files.wordpress.com/2013/03/13.jpg",
  "wut3": "http://gameplaceftw.files.wordpress.com/2013/03/5.png",
  "npm": "https://npmjs.org/search?q=voxel",
  "node": "https://github.com/maxogden/art-of-node#the-art-of-node",
  "nyc": "https://twitter.com/voxeljs/status/324253185868963840",
}

var slides = Object.keys(urls)

var game = require('voxel-hello-world')({
  texturePath: "./images/",
  playerSkin: "./images/player.png",
  materials: ["yellow"].concat(slides),
  materialFlatColor: false,
  generateVoxelChunks: false,
  lightsDisabled: true,
  chunkDistance: 1
})

var minutes   = 10 
var startTime = 800
var createSky = require('voxel-sky')({game: game, speed: ((2400 - startTime) * 0.25) / (minutes * 60 * 16) })
var sky       = createSky(startTime)

game.on('tick', sky)

var z = -5
var y = 3
slides.map(function(slide) {
  game.setBlock([0, y, z], slide)
  z += 2
  if (z > 5) {
    z = -5
    y += 2
  }
})

window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === '1'.charCodeAt(0)) {
    toggleStep(1)
  }
  if (ev.keyCode === '9'.charCodeAt(0)) {
    toggleStep(9)
  }
})

function toggleStep (num) {
  var step    = document.getElementById('step-' + num)
  var visible = step.style.display === 'block'
  step.style.display = (visible) ? 'none' : 'block'
}


game.on('setBlock', function(pos, val, old) {
  if (old === 1 || val === 1) return
  var url = urls[slides[old - 2]]
  var win = window.open(url)
})

game.interact.on('release', function() { game.paused = true; })
game.interact.on('attain',  function() { game.paused = false; alert("DO NOT FORGET TO START THE OSM SERVER!") })

window.game = game
