import Particle from "./particle";
import config from "./config";
import { explodeMusic, random } from "./utils";
import myShapeSet from "./shape";



class Rocket extends Particle{

    // 保炸颜色
    explosionColor = 0;

    update(){
        this.vel.x *= this.resistance
        this.vel.y *= this.resistance
        // 重力影响
        this.vel.y += this.gravity
        // 更新位置
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y

        // 尺寸衰减
        this.size *= this.shrink

        // 变淡
        // this.alpha -= this.fade
    }

    constructor(x: number){
        super({x, y: config.SCREEN_HEIGHT})
    }

    // 爆炸
    explode() {
        const count = random(80, 100)
        const { func, scope } = myShapeSet.random()
        const particles_ = [...Array(count)].map((i,idx)=>{
            const particle = new Particle(this.pos)

            const angle = scope[0] + scope[1] * idx / count;
            const speed = Math.cos(Math.random() * Math.PI / 2) * 15
            const sppedx = speed * func(angle) || 0


            particle.vel = {
                x: Math.cos(angle) * sppedx,
                y: Math.sin(angle) * sppedx
            }


            particle.size = 10
            particle.gravity = 0.2
            particle.resistance = 0.92
            particle.shrink = random(0.93, 0.98, false)
            const randomChance = random(0, 100) < 50
            particle.flick = randomChance
            particle.color = this.explosionColor
            particle.fade = random(0, 2)
            return particle
        })
        config.particles.push(...particles_)
        explodeMusic()
    }

    render(){
        if(!this.exists)return
        const c = config.getCanvasContext()
        c?.save()

        c!.globalCompositeOperation = 'lighter'

        const x = this.pos.x,
              y = this.pos.y,
              r = this.size / 2

        const gradient = c!.createRadialGradient(x, y, 0.1, x, y, r)
        gradient.addColorStop(0.1, `rgba(255,255,255, ${this.alpha})`)
        gradient.addColorStop(1, `rgba(0, 0, 0, ${this.alpha})`)

        c!.fillStyle = gradient
        c?.beginPath()
        c?.arc(x, y, this.flick? Math.random() * this.size / 2: this.size / 2, 0, Math.PI * 2, true)
        c?.closePath()
        c?.fill()
        c?.restore()
    }
}

export default Rocket