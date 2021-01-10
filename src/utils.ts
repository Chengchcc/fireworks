/**
 *  获取随机数
 * @param min
 * @param max
 * @param needFloor 是否需要取整
 */
export function random(min: number, max: number, needFloor = true){
    const rnd = Math.random()*(max-min) + min
    if(needFloor){
        return Math.floor(rnd)
    }else {
        return rnd
    }
}


export function functionName(fun: Function) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}

export function explodeMusic(){
    const auido = new Audio(require('../assets/boom.mp3'))
    auido.play()
}


export function launchMusic(){
    const chance = random(0, 3)
    if(chance % 2 == 0){
        const audio = new Audio(require('../assets/launch.mp3'))
        audio.play()
    }else {
        new Audio(require('../assets/launch2.mp3')).play()
    }
}

export function bgMusic(){
    const audio = new Audio(require('../assets/打上花火.mp3'))
    audio.addEventListener('ended', ()=>{
        audio.play()
    })
    audio.play()
}