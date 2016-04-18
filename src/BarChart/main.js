/**
 * Bubble chart based on d3.js
 */
import d3 from 'd3'

export default class {

  constructor(config) {
    console.info(config);
    const container = config.container
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;
    const title = config.title || '';
    const titleSub = config.titleSub || '';
    const rectPadding = config.rectPadding || 20;
    const dataset = config.data || [];

    let div = d3.select("body").append("div")
      .attr("class", "barTooltip")
      .style("opacity", 0);
    let valueSet = [];
    let nameSet = [];
    for (let i = 0; i < dataset.length; i++) {
      valueSet.push(dataset[i]['value']);
      nameSet.push(dataset[i]['name']);
    };
    //在 container 里添加一个 SVG 画布   
    let svg = d3.select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    //添加背景
    svg.append("g")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .style("fill", "#FFF")
      .style("stroke-width", 2)
      .style("stroke", "#E7E7E7");

    //画布周边的空白
    let padding = {
      left: 30,
      right: 30,
      top: 100,
      bottom: 20
    };

    //添加主标题
    svg.append("g")
      .append("text")
      .text(title)
      .attr("class", "title")
      .attr("x", padding.left)
      .attr("y", 40);

    //添加副标题
    svg.append("g")
      .append("text")
      .text(titleSub)
      .attr("class", "titleSub")
      .attr("x", padding.left)
      .style("font-size", '12px')
      .style("fill", '#b39ddb')
      .attr("y", 60);
    let xLen = width - padding.left * 1.7 - padding.right;
    let xItemLen = xLen / dataset.length;
    //x轴的比例尺
    let xScale = d3.scale.ordinal()
      .domain(nameSet)
      .rangeRoundBands([0, xLen]);

    //y轴的比例尺
    let yScale = d3.scale.linear()
      .domain([0, d3.max(valueSet)])
      .range([height - padding.top - padding.bottom, 0]);


    //定义x轴
    let xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

    //定义y轴
    let yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

    //添加x轴
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding.left * 1.7 + "," + (height - padding.bottom * 2) + ")")
      .style("fill", '#747779')
      .call(xAxis);

    //添加y轴
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding.left * 1.7 + "," + 80 + ")")
      .style("fill", '#747779')
      .call(yAxis);



    // break;
    //定义横轴网格线

    let xInner = d3.svg.axis()
      .scale(xScale)
      .tickSize(-(height - padding.top - padding.bottom), 0, 0)
      .orient("bottom")
      .ticks(dataset.length);


    //添加横轴网格线
    svg.append("g")
      .attr("class", "inner_line")
      .attr("transform", "translate(" + (padding.left * 1.7 - -xItemLen / 2) + "," + (height - padding.bottom * 2) + ")")
      .call(xInner)
      .selectAll("text")
      .text("");



    //定义纵轴网格线
    let yInner = d3.svg.axis()
      .scale(yScale)
      .tickSize(-(width - padding.left * 1.7 - padding.right), 0, 0)
      .tickFormat("")
      .orient("left")
      .ticks(10);

    //添加纵轴网格线
    let yBar = svg.append("g")
      .attr("class", "inner_line")
      .attr("transform", "translate(" + padding.left * 1.7 + "," + 80 + ")")
      .call(yInner);



    //添加矩形元素
    let rects = svg.selectAll(".MyRect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "MyRect")
      .attr("transform", "translate(" + padding.left * 1.7 + "," + 80 + ")")
      .attr("x", function(d, i) {
        return xScale(d.name) + rectPadding / 2;
      })
      .attr("y", function(d) {
        return yScale(d.value);
      })
      .attr("width", xScale.rangeBand() - rectPadding)
      .attr("height", function(d) {
        return height - padding.top - padding.bottom - yScale(d.value);
      })
      .on("mousemove", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(d.name + ":<br/>" + d.value)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        d3.select(this).attr("opacity", "0.8");
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
        d3.select(this).attr("opacity", "1");
      })
      .attr("fill", "#b39ddb");



    //添加文字元素
    // let texts = svg.selectAll(".MyText")
    //         .data(dataset)
    //         .enter()
    //         .append("text")
    //         .attr("class","MyText")
    //         .attr("transform","translate(" + padding.left + "," + padding.top + ")")
    //         .attr("x", function(d,i){
    //             return xScale(i) + rectPadding/2;
    //         } )
    //         .attr("y",function(d){
    //             // return '2015/04/20';
    //             return yScale(d);
    //         })
    //         .attr("dx",function(){
    //             return (xScale.rangeBand() - rectPadding)/2;
    //         })
    //         .attr("dy",function(d){
    //             return 20;
    //         })
    //         .text(function(d){
    //             return d;
    //         });



    //添加折线
    let line = d3.svg.line()
      .x(function(d, i) {
        return xScale(d.name) + padding.left * 1.7 + xItemLen / 2;
      })
      .y(function(d) {
        return yScale(d.value) + padding.top;
      });

    let path = svg.append("path")
      .attr("d", line(dataset))
      .style("fill", "#88dfeb")
      .style("fill", "none")
      .style("stroke-width", 2)
      .style("stroke", "#88dfeb")
      .style("stroke-opacity", 0.9);

    //添加折线小圆点
    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", function(d, i) {
        return xScale(d.name) + padding.left * 1.7 + xItemLen / 2;
      })
      .attr("cy", function(d) {
        return yScale(d.value) + padding.top;
      })
      .attr("r", 4)
      .on("mousemove", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(d.name + ":<br/>" + d.value)
          .style("left", (d3.event.pageX) + 10 + "px")
          .style("top", (d3.event.pageY - 18) + "px");
        d3.select(this)
          .attr("r", 8)
          .style("stroke-width", 5)
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
        d3.select(this)
          .attr("r", 4)
          .style("stroke-width", 2)

      })
      .style("stroke-width", 2)
      .style("stroke", "#88dfeb")
      .attr("fill", "#fff")
      .style("opacity", 0.8);
  }
}