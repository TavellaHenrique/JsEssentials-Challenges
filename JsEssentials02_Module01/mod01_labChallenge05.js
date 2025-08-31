
/*
Write a function, deepComp, that will compare two objects given as arguments (deep comparison).
Compare only properties (ignore methods), and consider the possibility of nesting (any number of levels).

Properties can also be objects and arrays. We are interested in the properties available during the usual enumeration.

let a={x:[1,2,3,4,5], y:0, z: {m:'test', n:false}};
let b={x:[1,2,3,4,5], y:0, z: {m:'test', n:false}};
let c={x:[1,2,3,4,5,6], y:0, z: {m:'test', n:false}};
let d={x:[1,2,3,4], y:0, z: {m:'test', n:false}};
let e={x:[1,2,3,4,5], y:0, z: {m:'test', n:true}};
let f={x:[1,2,3,4,5], y:-1, z: {m:'test', n:false}};
console.log(deepComp(a,b)); // -> true
console.log(deepComp(a,c)); // -> false
console.log(deepComp(a,d)); // -> false
console.log(deepComp(a,e)); // -> false
console.log(deepComp(a,f)); // -> false
*/

let deepComp = function(base, target) {
    // Comparando a quantidade de propriedades
    let stillEqual = Object.keys(base).length === Object.keys(target).length;

    // Caso tenham o mesmo número de propriedades
    if (stillEqual) {
        // Para cada propriedade do elemento base
        for (property in base) {
            // Se as propriedades forem do mesmo tipo
            if (typeof (base[property]) === typeof (target[property])) {
                // Se as propriedades forem um objeto, realiza novamente a comparação, mas com as propriedades (que são objetos)
                // Se não forem, realiza a comparação dos valores simples
                // (Repete até que não sejam mais objetos ou que seus valores sejam diferentes)
                stillEqual = typeof base[property] === "object" && typeof base[property] !== null ? deepComp(base[property], target[property]) : base[property] === target[property];
            } else {
                stillEqual = false;
            }
            if (!stillEqual) {
                break;
            }
        }
    }
    return stillEqual;
}

let a={x:[1,2,3,4,5], z: {m:'test', n:false}, y:0};
let b={x:[1,2,3,4,5], y:0, z: {m:'test', n:false}};
let c={x:[1,2,3,4,5,6], y:0, z: {m:'test', n:false}};
let d={x:[1,2,3,4], y:0, z: {m:'test', n:false}};
let e={x:[1,2,3,4,5], y:0, z: {m:'test', n:true}};
let f={x:[1,2,3,4,5], y:-1, z: {m:'test', n:false}};
console.log(deepComp(a,b)); // -> true
console.log(deepComp(a,c)); // -> false
console.log(deepComp(a,d)); // -> false
console.log(deepComp(a,e)); // -> false
console.log(deepComp(a,f)); // -> false