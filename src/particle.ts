import config, { Point } from "./config"
class Particle {
    // 位置信息
    pos: Point = {
        x: 0,
        y: 0
    }
    // 速度 x轴， y轴
    vel: Point = {
        x: 0,
        y: 0
    }
    // 阻力作用参数
    resistance = 1
    // 重力系数
    gravity =  0
    // 尺寸
    size = 2
    // 衰减系数
    shrink = .97
    // 透明度
    alpha = 1
    // 透明度衰减系数
    fade = 0
    // 颜色
    color = 0
    // 是否闪烁
    flick = false

    index = 0

    frame = 50

    __liner(src: number, dst: number, coeff: number){
        return src + (dst - src) * coeff
    }

    get exists(){
        //
        return this.alpha >=0.1 && this.size>=1 && this.index<this.frame
    }

    constructor(pos?: Point){
        this.pos = {
            x: pos?.x?? 0,
            y: pos?.y?? 0
        }
    }

    update() {
        // 阻力影响
        this.index ++
        if(this.index > this.frame){
            this.vel.x *= this.resistance
            this.vel.y *= this.resistance
            // 重力影响
            this.vel.y += this.gravity
            // 更新位置
            this.pos.x += this.vel.x
            this.pos.y += this.vel.y
        }else {
            const coeff = this.index / this.frame
            const param1 = coeff * coeff
            this.vel.x *= this.resistance
            this.vel.y *= this.resistance
            this.vel.y += this.gravity
            
            this.pos.x  += this.__liner(this.vel.x, 0, param1)
            this.pos.y  += this.__liner(this.vel.y, 0, param1)  + this.gravity
        }
        // 尺寸衰减
        this.size *= this.shrink

        // 变淡
        this.alpha -= this.fade
    }

    render() {
        if(!this.exists) return
        const c = config.getCanvasContext()
        c?.save()
        c!.globalCompositeOperation = 'lighter'
        const x = this.pos.x,
            y = this.pos.y,
            r =this.size/2
        const gradient = c!.createRadialGradient(x, y, 0.1, x, y, r)
        gradient.addColorStop(0.1, `rgba(255, 255, 255, ${this.alpha})`)
        gradient.addColorStop(0.8, `hsla(${this.color}, 100%, 50%, ${this.alpha})`)
        gradient.addColorStop(1, `hsla(${this.color}, 100%, 50%, 0.1)`)
        c!.fillStyle = gradient
        c?.beginPath()
        c?.arc(x, y, this.flick? Math.random()*this.size: this.size, 0, Math.PI*2, true)
        c?.closePath()
        c?.fill()
        c?.restore()
    }
}

export default Particle