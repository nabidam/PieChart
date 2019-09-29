import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const drawerWidth = 240;

const styles = {
  root: {
    display: "flex",
    transition: "0.3s"
  },
  pie: {
    backgroundImage: "radial-gradient(circle at 0 8%, #ec373c, #ffffff)",
    "&:hover": {
      transform: "scale(1.1)",
      cursir: "pointer"
    }
  },
  animated: {
    transition: ".2s ease-in-out"
  }
};

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredPie: null
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleUnhover = this.handleUnhover.bind(this);
  }

  handleHover = id => {
    this.setState({
      hoveredPie: id
    });
  };

  handleUnhover = () => {
    this.setState({
      hoveredPie: null
    });
  };

  render() {
    let cumulativePercent = 0;

    return (
      <div className={styles.root}>
        <svg
          height={this.props.height}
          width={this.props.width}
          style={{transform: "rotate(-90deg)"}}
          viewBox="-1.5 -1.5 3 3"
        >
          {this.props.data.map((item, index) => {
            const percent = cumulativePercent;

            const startX = Math.cos(2 * Math.PI * percent);
            const startY = Math.sin(2 * Math.PI * percent);
            console.log(index, startX, startY);

            if (startX >= 0.5 && startY >= -0.5) {
              var cx = 1;
              var cy = 0;
            } else if (startX <= 0.5 && startY >= 0.5) {
              var cx = 1;
              var cy = 1;
            } else if (startX <= -0.5 && startY <= 0.5) {
              var cx = 0;
              var cy = 1;
            } else if (startX >= -0.5 && startY <= -0.5) {
              var cx = 0;
              var cy = 0;
            }
            cumulativePercent += item.value > 1 ? item.value / 100 : item.value;

            var endX = Math.cos(2 * Math.PI * cumulativePercent);
            var endY = Math.sin(2 * Math.PI * cumulativePercent);
            return (
              <radialGradient
                key={index}
                id={"gradient-" + index}
                cx={cx}
                cy={cy}
                r="1"
              >
                <stop
                  offset="10%"
                  style={{stopColor: "#fff", stopOpacity: 1}}
                />
                <stop
                  offset="90%"
                  style={{stopColor: item.color, stopOpacity: 1}}
                />
              </radialGradient>
            );
          })}
          <defs>
            {this.props.data.map((item, index) => {
              const percent = cumulativePercent;
              var startX = Math.cos(2 * Math.PI * (percent - 0.01));
              var startY = Math.sin(2 * Math.PI * (percent - 0.01));
              cumulativePercent +=
                item.value > 1 ? item.value / 100 : item.value;
              var scaledRadius =
                this.props.innerRadius / this.props.outerRadius;

              scaledRadius =
                this.state.hoveredPie == index
                  ? 0.8 * scaledRadius
                  : scaledRadius;

              var endX = Math.cos(2 * Math.PI * cumulativePercent);
              var endY = Math.sin(2 * Math.PI * cumulativePercent);

              const largeArcFlag =
                (item.value > 1 ? item.value / 100 : item.value) > 0.5 ? 1 : 0;

              const pathData = [
                `M ${startX} ${startY}`,
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `L 0 0`
              ].join(" ");

              return (
                <mask id={"centrehole-" + index} key={index}>
                  <rect
                    x="-100%"
                    y="-100%"
                    width="200%"
                    height="200%"
                    fill="white"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r={scaledRadius}
                    fill="#000"
                    className={styles.animated}
                  />
                </mask>
              );
            })}
          </defs>

          <g>
            {this.props.data.map((item, index) => {
              const percent = cumulativePercent;
              const startX = Math.cos(2 * Math.PI * percent);
              const startY = Math.sin(2 * Math.PI * percent);
              console.log(startX, startY);
              cumulativePercent +=
                item.value > 1 ? item.value / 100 : item.value;
              const endX = Math.cos(2 * Math.PI * cumulativePercent);
              const endY = Math.sin(2 * Math.PI * cumulativePercent);
              const largeArcFlag =
                (item.value > 1 ? item.value / 100 : item.value) > 0.5 ? 1 : 0;
              const pathData = [
                `M ${startX} ${startY}`,
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `L 0 0`
              ].join(" ");

              return (
                <path
                  className={classNames(styles.animated, styles.pie)}
                  mask={"url(#centrehole-" + index + ")"}
                  key={"path-" + index}
                  d={pathData}
                  fill={"url(#gradient-" + index + ")"}
                  onMouseEnter={() => this.handleHover(index)}
                  onMouseLeave={() => this.handleUnhover()}
                ></path>
              );
            })}
          </g>
          <g>
            {this.props.data.map((item, index) => {
              cumulativePercent +=
                item.value > 1 ? item.value / 100 : item.value;
              const endX = Math.cos(2 * Math.PI * cumulativePercent);
              const endY = Math.sin(2 * Math.PI * cumulativePercent);
              const largeArcFlag =
                (item.value > 1 ? item.value / 100 : item.value) > 0.5 ? 1 : 0;

              const radius =
                this.props.outerRadius -
                (this.props.outerRadius - this.props.innerRadius) / 2;
              const scaledRadius = radius / this.props.outerRadius;
              const circleRadius =
                (this.props.outerRadius - this.props.innerRadius) /
                2 /
                this.props.outerRadius;

              return (
                <circle
                  className={styles.animated}
                  key={"circle-" + index}
                  cx={endX * scaledRadius}
                  cy={endY * scaledRadius}
                  r={
                    this.state.hoveredPie == index
                      ? circleRadius + 0.09
                      : circleRadius
                  }
                  fill={item.color}
                />
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default PieChart;
