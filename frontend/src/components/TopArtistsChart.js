import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export default class TopArtistsChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("//localhost:3001/top-artists/10")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        jsonResponse.forEach((element) => {
          element.Stream = parseInt(element.Stream / 100000);
        });
        // Create an Index column for the data
        jsonResponse.forEach((element, index) => {
          element.Index = index + 1;
        });
        this.setState({ data: jsonResponse });
      });
  }

  render() {
    return (
      <>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            width={800}
            height={600}
            data={this.state.data}
            margin={{
              top: 70,
              right: 30,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Index" />

            <YAxis
              label={{
                value: "Spotify Streams (*1e^5)",
                angle: -90,
                position: "insideLeft",
                offset: -25,
              }}
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} textAnchor="start" />
            <Bar
              dataKey="Stream"
              fill="#8884d8"
            />
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
}
