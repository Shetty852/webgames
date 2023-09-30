
export const getRandomNumber=(min,max)=>{
    return Math.floor(Math.random()*(max-min)+min)
}

export const getCssprop = (element, cssProperty)=>{
    return window
    .getComputedStyle(element)
    .getPropertyValue(cssProperty)
}

export const detection= (el1, el2, ectra )=>{
    const rect1 =el1.getBoundingClintRect()
    const rect2=el2.getBoundingClintRect()
    
    extra= extra || {
        y1:0,y2:0
    }
    return{
        rect1.x < rect2.x+ rect2.width &&
        rect1.x < rect1.width> rect2.x &&
        rect1.y < rect2.x+ rect2.height+ extra.y1 &&
        rect1.y < rect1.height> rect2.y&&+ extra.y2 &&
    }
}