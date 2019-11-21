import React, {Component} from "react";
import Chart from "react-apexcharts";
import {isEqual} from "lodash";

class CustomGraph extends Component {

    state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ["A", "B", "C", "D", "E", "F",
                    "G", "H", "I", "J", "K",
                    "L", "M", "N", "O", "P",
                    "Q", "R", "S", "T", "U",
                    "V", "W", "X", "Y", "Z"]
            }
        },
        series: [
            {
                name: "Normal Frequency",
                data: [8.12, 1.49, 2.71, 4.32, 12.02, 2.30,
                    2.03, 5.92, 7.31, 0.10, 0.69,
                    3.98, 2.61, 6.95, 7.68, 1.82,
                    0.11, 6.02, 6.28, 9.10, 2.88,
                    1.11, 2.09, 0.17, 2.11, 0.07]
            },
            {
                name: "Cipher-Text Frequency",
                data: this.props.data
            }
        ],
        type: this.props.type
    };

    // componentDidUpdate(prevProps, prevState) {
    //     let oldSeries = prevState.series.map((item) => item.data)[1];
    //     if (!isEqual(oldSeries, this.props.data)) {
    //         const newSeries = this.state.series.slice();
    //         newSeries[1].data = this.props.data;
    //         this.setState({series: newSeries});
    //     }
    // }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={[
                                {
                                    name: "Normal Frequency",
                                    data: [8.12, 1.49, 2.71, 4.32, 12.02, 2.30,
                                        2.03, 5.92, 7.31, 0.10, 0.69,
                                        3.98, 2.61, 6.95, 7.68, 1.82,
                                        0.11, 6.02, 6.28, 9.10, 2.88,
                                        1.11, 2.09, 0.17, 2.11, 0.07]
                                },
                                {
                                    name: "Cipher-Text Frequency",
                                    data: this.props.data
                                }]}
                            type={this.state.type}
                            width={'100%'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomGraph;