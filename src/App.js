import React, {Component} from "react";
import PieChart from "./components/PieChart";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
};

const data = [
  {
    value: 58,
    color: "#0d43ff"
  },
  {
    value: 42,
    color: "#da0000"
  }
];

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <PieChart
          data={data}
          innerRadius={300}
          outerRadius={400}
          width={250}
          height={250}
        />
      </div>
    );
  }
}

export default App;
