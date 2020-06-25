class GraphGrid extends React.Component {
  constructor() {
    super();
    /*
        Options
    */
    this.state = {
      xAxis: {
        max: 2018,
        min: 1918
      },
      yAxis: {
        max: 100,
        min: 0
      },
      traces: {
        testLine: {
          x: [],
          y: [],
          xy: []
        }
      }
    };
    this.state.xAxis.delta = this.state.xAxis.max - this.state.xAxis.min;
    if (!this.state.xAxis.increment) {
      this.state.xAxis.increment = this.state.xAxis.delta / 10;
    }
    this.state.yAxis.delta = this.state.yAxis.max - this.state.yAxis.min;
    if (!this.state.yAxis.increment) {
      this.state.yAxis.increment = this.state.yAxis.delta / 10;
    }
    /*
        XY Traces
    */
    var i = this.state.xAxis.min;
    while (i <= this.state.xAxis.max) {
      this.state.traces["testLine"].x.push(i);
      this.state.traces["testLine"].y.push(Math.round(Math.random() * 100));
      i++;
      //   i += 5;
    }
    this.state.traces["testLine"].y = this.state.traces["testLine"].y.sort(
      function(a, b) {
        return a - b;
      }
    );
    /*
        X Axis
    */
    this.state.xAxis.delta = this.state.xAxis.max - this.state.xAxis.min;
    this.state.xAxis.cells = this.state.xAxis.delta;
    /* 
        Y Axis
    */
    this.state.yAxis.delta = this.state.yAxis.max - this.state.yAxis.min;
    /*
        XY Path - area
    */
    this.state.xyArea = "M100,100 L 0,100 ";
    this.state.traces["testLine"].x.forEach((x, i) => {
      var y = this.state.traces["testLine"].y[i];
      var yPercent = (this.state.yAxis.max - y) / this.state.yAxis.delta * 100;
      var xPercent = (x - this.state.xAxis.min) / this.state.xAxis.delta * 100;
      this.state.xyArea += `${xPercent},${yPercent} `;
      this.state.traces["testLine"].xy.push([xPercent, yPercent]);
    });
    this.state.xyArea += "Z";
  }
  render() {
    /*
        Y Axis
    */
    var YLabels = [];
    var yi = this.state.yAxis.min;
    while (yi < this.state.yAxis.max) {
      // other y-axis values
      YLabels.push(
        <tr key={yi}>
          <td className="graph-yLabel graph-yAxis">
            <span className="graph-yText">{yi}</span>
          </td>
        </tr>
      );
      yi += this.state.yAxis.increment;
    }
    YLabels = YLabels.reverse();
    YLabels.pop();
    this.state.yCells = YLabels.length + 1;
    this.state.yAxis.max = this.state.yAxis.max;
    console.log("this.state", this.state);
    /*
        X Axis
    */
    var XLabels = [];
    var xi = 0;
    var xn;
    while (xi < this.state.traces["testLine"].x.length) {
      xn = this.state.traces["testLine"].x[xi];
      if (xi === 0) {
        XLabels.push(
          <td key={xi} className="graph-xLabel graph-yLabel graph-yAxis">
            <span className="graph-yText">{this.state.yAxis.min}</span>
            <span className="graph-xPosition">
              <span className="graph-xText">{xn}</span>
            </span>
          </td>
        );
      } else {
        XLabels.push(
          <td key={xi} className="graph-xLabel">
            <span className="graph-xPosition">
              <span className="graph-xText">{xn}</span>
            </span>
          </td>
        );
      }
      xi += this.state.xAxis.increment;
    }

    var XYDots = [];
    this.state.traces["testLine"].x.forEach((x, i) => {
      var y = this.state.traces["testLine"].y[i];
      var yPercent = (this.state.yAxis.max - y) / this.state.yAxis.delta * 100;
      var xPercent = (x - this.state.xAxis.min) / this.state.xAxis.delta * 100;
      var dotDiameter = 100 / this.state.traces["testLine"].x.length;
      XYDots.push(
        <div
          key={i}
          className="dot"
          style={{
            top: yPercent + "%",
            left: xPercent + "%",
            width: dotDiameter + "%"
          }}
        >
          <div className="dot-circle" />
          <div className="dot-label">
            <div>x: {x}</div>
            <div>y: {y}</div>
          </div>
        </div>
      );
    });

    /*
        D3
    */
    // var areaGenerator = d3.area().y0(this.state.yAxis.max);
    // var d3AreaPath = areaGenerator(this.state.traces["testLine"].xy);

    /*
        D3 X
    */
    // var x = d3
    //   .scaleLinear()
    //   .domain([this.state.xAxis.min, this.state.xAxis.max]);
    // var y = d3
    //   .scaleLinear()
    //   .domain([this.state.yAxis.max, this.state.yAxis.min]);
    // var xAxis = d3.axisBottom().scale(x);
    // var yAxis = d3.axisLeft().scale(y);

    // var svg = d3.select("svg");
    // svg
    //   .call(xAxis.ticks())
    //   .selectAll(".tick")
    //   .each(function(data) {
    //     var tick = d3.select(this);
    //     console.log("x tick", tick._groups[0][0].lastChild.innerHTML);
    //   });

    /*
        Render
    */
    return (
      <div>
        <table className="graph-table">
          <tbody>
            <tr>
              <td colSpan={4 + this.state.xAxis.cells} className="graph-title">
                {window.randomWord()}:
              </td>
            </tr>
            <tr>
              <td rowSpan={this.state.yCells + 1} className="graph-yTitle">
                <div className="graph-yTitle-position">
                  <span className="graph-yTitle-text">
                    Y-Axis Title (Counting Crows)
                  </span>
                </div>
              </td>
              <td className="graph-yLabel graph-yAxis">
                <span className="graph-yText">{this.state.yAxis.max}</span>
              </td>
              <td
                ref="graphContainer"
                colSpan={0 + this.state.xAxis.cells}
                rowSpan={this.state.yCells + 0}
                className="graph-td"
              >
                {/* <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d={d3AreaPath}
                    vectorEffect="non-scaling-stroke"
                    filter="url(#dropshadow)"
                  />
                </svg> */}
                <svg
                  className="graph-svg-area"
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d={this.state.xyArea}
                    vectorEffect="non-scaling-stroke"
                    filter="url(#dropshadow)"
                  />
                </svg>
                <div className="graph-div-scatter">{XYDots}</div>
              </td>
              <td
                colSpan="2"
                rowSpan={this.state.yCells + 1}
                className="graph-key"
                style={{ width: 100 / (this.state.xAxis.cells + 1) + "%" }}
              >
                <b className="key-title">Key:</b>
                <div className="key-label">
                  <span className="key-sq" />
                  <span className="key-text">{window.randomWord()}</span>
                </div>
              </td>
            </tr>
            {YLabels}
            <tr className="graph-xAxis">{XLabels}</tr>
            <tr>
              <td colSpan={4 + this.state.xAxis.cells} className="graph-xTitle">
                X-Axis Title (Years)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
ReactDOM.render(<GraphGrid />, document.getElementById("app-index1"));
ReactDOM.render(<GraphGrid />, document.getElementById("app-index2"));
