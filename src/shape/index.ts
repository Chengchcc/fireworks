const PI = Math.PI;
const PI2 = Math.PI * 2;
const PI7_8 = Math.PI * 7 / 8;
const PI15_32 = Math.PI * 15 / 32;
const PI_16 = Math.PI / 16;

class Shape {
    Set: {func:Function,scope:number[]}[]
    constructor() { this.Set = []; }
    push({ func, scope }: { func: Function, scope: number[] }) { this.Set.push({ func, scope }); }
    random() { return this.Set[Math.floor(Math.random() * this.Set.length)]; }
};


// 圆形曲线
function circle(θ: number) {
    return 1;
}

// 心形曲线
function cardioid(θ: number) {
    return 1 + Math.sin(θ);
}


// 玫瑰曲线
const rose: any[] = [];
function roseCurve(θ: number, n = 3) {
    rose[n] || (rose[n] = {});
    rose[n][θ] || (rose[n][θ] = Math.sin(n * θ));
    return rose[n][θ];
};

// 蝴蝶曲线
const butterfly: any = {};
function butterflyCurve(θ: number) {
    butterfly[θ] || (butterfly[θ] = Math.exp(Math.cos(θ)) - 2 * Math.cos(4 * θ) + Math.pow(Math.sin(θ / 12), 5));
    return butterfly[θ];
}

// 伯努利双扭线
const lemn: any = {};
function lemniscate(θ: number) {
    lemn[θ] || (lemn[θ] = Math.sqrt(Math.cos(2 * θ)));
    return lemn[θ];
}

const myShapeSet = new Shape();
myShapeSet.push({ func: circle, scope: [0, PI2] });
myShapeSet.push({ func: cardioid, scope: [0, PI2] });
myShapeSet.push({ func: roseCurve, scope: [0, PI] });
myShapeSet.push({ func: function (θ: number) { return roseCurve(θ, 2); }, scope: [0, PI2] });
myShapeSet.push({ func: function (θ: number) { return roseCurve(θ, 5); }, scope: [0, PI] });
myShapeSet.push({ func: function (θ: number) { return roseCurve(θ, 1.5); }, scope: [0, 2 * PI2] });
myShapeSet.push({ func: lemniscate, scope: [0, PI2] });
myShapeSet.push({ func: butterflyCurve, scope: [0, PI2] });


export default myShapeSet

