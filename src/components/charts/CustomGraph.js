import React, {Component} from "react";
import Chart from "react-apexcharts";

class CustomGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                    data: [8.12, 1.49, 2.71, 4.32, 12.02, 2.30,
                        2.03, 5.92, 7.31, 0.10, 0.69,
                        3.98, 2.61, 6.95, 7.68, 1.82,
                        0.11, 6.02, 6.28, 9.10, 2.88,
                        1.11, 2.09, 0.17, 2.11, 0.07]
                }
            ],
            type: this.props.type
        };
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
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