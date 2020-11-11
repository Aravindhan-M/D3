const data = [25,20,10,12,15]
const MARGIN ={ LEFT : 100 , RIGHT : 10 , TOP :10 , BOTTOM :100}
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM
const svg = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH+ MARGIN.LEFT+ MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    // .attr("fill" , "green/")

// const circles = svg.selectAll("circle")
//     .data(data)
// circles.enter().append("circle")
// .attr("cx",(d,i)=> (50 * i) + 50)
// .attr("cy",250)
// .attr("r",(d)=>d)
// .attr("fill","red")
// svg.append("circle")
    // .attr("cx",200)
    // .attr("cy",200)
    // .attr("r",100)
    // .attr("fill" , "blue")

// const svg = d3.select("#chart-area").append("svg")

const  g = svg.append("g")
    .attr("transform",`translate(${MARGIN.LEFT},${MARGIN.TOP})`)

d3.json("data/buildings.json").then(data=>{
    console.log(data , "JSON DATA")
    data.forEach(d => {
        d.height = Number(d.height)  
    })
    const x = d3.scaleBand()
    // .domain(["BK" , "ST" , "AACT" , "PAFC" , "LWT" , "ee" , "erer"])
    .domain(data.map(d=>d.name))
    .range([0,WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2)

    const y = d3.scaleLinear()
    .domain([0,d3.max(data , d=>d.height)])
    .range([0,HEIGHT])
    const rects = g.selectAll("rect")
    .data(data)
    rects.enter().append("rect")
    .attr("y" , 0)
    .attr("x" , (d,i)=>(i *60))
    .attr("width" , 40)
    .attr("height" , d=> y(d.height))
    .attr("fill" , "grey")
})