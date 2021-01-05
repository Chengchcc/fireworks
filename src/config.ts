
class Config  {
    getCanvas(){
        const canvas = document.querySelector('#canvas') as HTMLCanvasElement
        return canvas
    }

    getCanvasContext(){
        const canvas = this.getCanvas()
        return canvas!.getContext('2d')
    }

    SCREEN_WIDTH = window.innerWidth
    SCREEN_HEIGHT = window.innerHeight

    mousePos: Point = {
        x: 400,
        y: 300
    }

    rockets: any[] = []

    particles: any[] = []

}

export interface Point {
    x: number
    y: number
}

export default new Config()