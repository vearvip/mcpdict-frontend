export function random(Min,Max){

    var Range = Max - Min;

    var Rand = Math.random();

    var num = Min + Math.round(Rand * Range); //四舍五入

    return num;

}

export var getRandomColor = function() {
    return `rgb(${random(40, 160)}, ${random(40, 160)}, ${random(40, 160)})`
}