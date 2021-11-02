
export function drawMouse(ctx, colorsOn = true) {
    let colors = ["#35bdc4"]

    // Draw Left Ear
    ctx.beginPath()
    ctx.arc(ctx.canvas.width/3, ctx.canvas.height/4, 60, 0,2*Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
    if (colorsOn) ctx.fillStyle = colors[0]
    else ctx.fillStyle = "white"
    ctx.fill()

    // Draw Right Ear
    ctx.beginPath()
    //ctx.moveTo(2*ctx.canvas.width/3, ctx.canvas.height/4)
    ctx.arc(2*ctx.canvas.width/3, ctx.canvas.height/4, 60, 0,2*Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
    if (colorsOn)  ctx.fillStyle = colors[0]
    else ctx.fillStyle = "white"
    ctx.fill()

    // Draw Head
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width/3, ctx.canvas.height/4)
    ctx.lineTo(2*ctx.canvas.width/3, ctx.canvas.height/4)
    ctx.lineTo(ctx.canvas.width/2, ctx.canvas.height*3/4)
    ctx.lineTo(ctx.canvas.width/3, ctx.canvas.height/4)
    ctx.lineWidth = 2
    ctx.stroke()
    if (colorsOn)  ctx.fillStyle = colors[0]
    else ctx.fillStyle = "white"
    ctx.fill()

    // Draw Left Eye
    ctx.beginPath()
    ctx.arc((1/3+1/2)/2*ctx.canvas.width, ctx.canvas.height/3, 20, 0,2*Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
    if (colorsOn) ctx.fillStyle = "white"
    ctx.fill()

    // Draw left pupil
    ctx.beginPath()
    ctx.arc((1/3+1/2)/2*ctx.canvas.width, ctx.canvas.height/3, 5, 0,2*Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = "black"
    ctx.fill()


    // Draw Right Eye
    ctx.beginPath()
    ctx.arc((2/3+1/2)/2*ctx.canvas.width, ctx.canvas.height/3, 20, 0,2*Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = "white"
    ctx.fill()

    // Draw right pupil
    ctx.beginPath()
    ctx.arc((2/3+1/2)/2*ctx.canvas.width, ctx.canvas.height/3, 5, 0,2*Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = "black"
    ctx.fill()

    // Draw Nose
    if (colorsOn) {
        ctx.beginPath()
        ctx.moveTo(ctx.canvas.width/2 - ctx.canvas.width/3/10, ctx.canvas.height/4 + .8*ctx.canvas.height/2)
        ctx.lineTo(ctx.canvas.width/2 + ctx.canvas.width/3/10, ctx.canvas.height/4 + .8*ctx.canvas.height/2)
        ctx.lineTo(ctx.canvas.width/2, ctx.canvas.height*3/4)
        ctx.lineTo(ctx.canvas.width/2 - ctx.canvas.width/3/10, ctx.canvas.height/4 + .8*ctx.canvas.height/2)
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.fillStyle = "black"
        ctx.fill()
    }

    // Draw Whiskers
    ctx.beginPath()
    let whiskerStartX = ctx.canvas.width/2 - ctx.canvas.width/3/10
    let whiskerStartY = ctx.canvas.height/4 + .7*ctx.canvas.height/2
    ctx.moveTo(whiskerStartX, whiskerStartY - 5)
    ctx.lineTo(whiskerStartX - ctx.canvas.width/12, whiskerStartY - 10)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(whiskerStartX + 3, whiskerStartY + 5)
    ctx.lineTo(whiskerStartX - ctx.canvas.width/12, whiskerStartY + 10)
    ctx.stroke()

    ctx.beginPath()
    whiskerStartX = ctx.canvas.width/2 + ctx.canvas.width/3/10
    whiskerStartY = ctx.canvas.height/4 + .7*ctx.canvas.height/2
    ctx.moveTo(whiskerStartX, whiskerStartY - 5)
    ctx.lineTo(whiskerStartX + ctx.canvas.width/12, whiskerStartY - 10)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(whiskerStartX - 3, whiskerStartY + 5)
    ctx.lineTo(whiskerStartX + ctx.canvas.width/12, whiskerStartY + 10)
    ctx.stroke()
}

export function drawFox (ctx) {

}