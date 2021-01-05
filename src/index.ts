import config from "./config";
import Particle from "./particle";
import Rocket from "./rocket";
import { random } from "./utils";

const MAX_PARTICLES = 400


function loop(){
    // update screen size
    const canvas = config.getCanvas()
    if(config.SCREEN_WIDTH != window.innerWidth){
        canvas.width = config.SCREEN_WIDTH = window.innerWidth
    }

    if(config.SCREEN_HEIGHT != window.innerHeight) {
        canvas.height = config.SCREEN_HEIGHT = window.innerHeight
    }

    // clear canvas
    const c = config.getCanvasContext()
    c!.fillStyle = 'rgba(0, 0, 0, 0.05)'
    c?.fillRect(0, 0, config.SCREEN_WIDTH, config.SCREEN_HEIGHT)
    const existingRocket:any[] = []
    config.rockets.forEach((rocket: Rocket)=>{
        rocket.update()
        rocket.render()

        const mousePos = config.mousePos
        const rocketPos = rocket.pos

        const distance = Math.sqrt(Math.pow(mousePos.x - rocketPos.x, 2)+ Math.pow(mousePos.y - rocketPos.y, 2))

        const randomChance = rocketPos.y < (config.SCREEN_HEIGHT * 2 / 3)? (Math.random() * 100 <= 1) : false

        if(rocketPos.y < config.SCREEN_HEIGHT / 3 || rocket.vel.y >=0 || distance< 50 || randomChance) {
            rocket.explode()
        }else {
            existingRocket.push(rocket)
        }
    })

    config.rockets = existingRocket

    // update particles

    const existingParticles: any[] =[]

    config.particles.forEach((particle: Particle)=>{
        particle.update()
        if(particle.exists){
            particle.render()
            existingParticles.push(particle)
        }
    })

    while(existingParticles.length> MAX_PARTICLES){
        existingParticles.shift()
    }

    config.particles = existingParticles
}


function launchForm(x: number){
    if(config.rockets.length < 10){
        const rocket = new Rocket(x)
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10
        rocket.vel = {
            x: random(-1, 1, false),
            y: random(-4, -1, false)
        }
        rocket.size = 8
        rocket.shrink = 0.999
        rocket.gravity = 0.01
        rocket.flick = false
        config.rockets.push(rocket)
    }
}


function launch() {
    launchForm(config.mousePos.x)
}


document.addEventListener('mousedown', function(e){
    e.preventDefault()
    ;[...Array(5)].map(()=>{
        launchForm(Math.random() * config.SCREEN_WIDTH * 2 / 3 + config.SCREEN_WIDTH / 6)
    })
})

document.addEventListener('mousemove', function(e){
    e.preventDefault()
    config.mousePos = {
        x: e.clientX,
        y: e.clientY
    }
})


window.onload =  function() {
    console.log('xxx')
    const canvas = config.getCanvas()
    canvas.width = config.SCREEN_WIDTH
    canvas.height = config.SCREEN_HEIGHT
    setInterval(launch, 800)
    setInterval(loop, 20)
}