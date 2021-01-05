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