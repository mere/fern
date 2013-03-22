define(
    [
        'd3'
    ],
    function (d3) {
        return function() {

            // transformations
            var t = [
                    // probability, x0,y0,z0, x1,y1,z1
                    [.77, 0.85,0.04,0.075, -0.04,0.85,0.18], // go forward
                    [.89, 0.2,-0.26,0.4, 0.23,0.22,0.045], // go left
                    [.99, -0.15,0.28,0.575, 0.26,0.24, -0.086], // go right
                    [1, 0,0,0.5, 0,0.16,0]    // shape of the 'stalk'
                ]
              , timeoutID
              , pointsPerTick = 2000
              , numPointsToPlot = 800000
              , view = d3.select(".view")
              , canvas = view.append("canvas")

            d3.select(window)
                .on("resize.me", update)

            function update() {
                timeoutID && clearTimeout(timeoutID)

                var w = window.innerWidth
                  , h = window.innerHeight
                  , ctx= canvas.node()
                    .getContext("2d")
                  , x = 0
                  , y = 0
                  , x0 , p, r // path, random number
                  , pointsPlotted = 0
                
                canvas
                    .attr("width", w)
                    .attr("height", h)
                
                updateSome()

                function updateSome() {
                    for (var i=0; i<pointsPerTick; i++) {
                        x0 = x
                        r = Math.random() 
                        p = t[(r<t[0][0])? 0
                            : ((r<t[1][0])? 1
                            : ((r<t[2][0])? 2 : 3 ))] // path to take
                        x = p[1]*x + p[2]*y + p[3]
                        y = p[4]*x0 + p[5]*y + p[6]

                        ctx.fillStyle = "rgba(120,141,65,0.1)";
                        ctx.fillRect(x*w,y*h,1,1)
                    }
                    pointsPlotted += i
                    if (pointsPlotted<numPointsToPlot) {
                        timeoutID = setTimeout(updateSome, 1)
                    }
                }

            }

            update();
            
            
        }
})
