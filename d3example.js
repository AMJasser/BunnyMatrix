
// data processing to make referecing values in dataset easier
function dataPreprocessor(row) {
    // function to convert string to date
    //var parseTime = d3.timeParse("%B %d, %Y");
    //parseTime("June 30, 2015"); // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)
    
    //Citation: https://github.com/d3/d3-time-format
    
    var parseDate = d3.timeParse("%m/%d/%Y");

    return {
        date: parseDate(row["Date"]),
        weekly_sales: +row["Weekly_Sales"],
        isHoliday: row["IsHoliday"],
    };
}

d3.csv("./datasets/walmart/short_walmart.csv", dataPreprocessor).then(function (
    dataset
) {
    minDate = d3.min(dataset, (d) => d.date);
    maxDate = d3.max(dataset, (d) => d.date);

    minWSales = d3.min(dataset, (d) => d.weekly_sales);
    maxWSales = d3.max(dataset, (d) => d.weekly_sales);

    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    let xScale = d3
        .scaleTime()
        .domain([minDate, maxDate])
        .range([0, width]);
    let yScale = d3
        .scaleLinear()
        .domain([minWSales, maxWSales])
        .range([height, 0]);

    var g = svg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    g.append("g").call(d3.axisLeft(yScale));

    svg.append("g")
        .selectAll("dot")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            console.log(1);
            return xScale(d.date);
        })
        .attr("cy", function (d) {
            return yScale(d.weekly_sales);
        })
        .attr("r", 2)
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", "#CC0000");
});
