import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Card, Col, Form, Input, InputNumber, PageHeader, Popover, Row, Typography} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
//import {playfairEncrypt, playfairDecrypt} from "../../utils/crypoFunctions";
import {vigenereEncrypt, vigenereDecrypt, euclid} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";
import {getFrequency} from "../../utils/generalFunctions";

const {Paragraph, Text} = Typography;


class Playfair extends Component {

    state = {
        a: 2,
        b: 1,
        d: 3,
        x: 4,
        y: 5
    };

    handleValuesOfA(value) {
        this.setState({a: Number(value)}, () => this.calculateEuclid());
    }

    handleValuesOfB(value) {
        this.setState({b: Number(value)}, () => this.calculateEuclid());
    }

    handleValuesOfX(value) {
        this.setState({x: Number(value)}, () => this.calculateEuclid());
    }

    handleValuesOfY(value) {
        this.setState({y: Number(value)}, () => this.calculateEuclid());
    }

    handleValuesOfD(value) {
        this.setState({d: Number(value)}, () => this.calculateEuclid());
    }

    calculateEuclid() {
        let [x, y, d] = euclid(this.state.a, this.state.b);
        this.setState({
            x: x,
            y: y,
            d: d
        })
    }

    render() {
        return (
            <div className="Extended-Euclid">
                <div>
                    <PageHeader
                        title='Extended-Euclid Algorithm'>
                    </PageHeader>
                </div>
                <div>
                    <Row type="flex" justify="space-around" align="top">
                        <Col lg={11} md={23} sm={23} xs={23}>
                            <Row>
                                <Card title="Inputs" bordered={false}>
                                    <Form layout={"inline"}>
                                        <Form.Item label={"Enter your inputs such that A is greater than B"}>
                                            <Popover content={"HI"}>
                                                <Form.Item label={"A"}>
                                                    <InputNumber size="medium" min={Number(this.state.b + 1)}
                                                                 max={1000000}
                                                                 value={this.state.a}
                                                                 onChange={this.handleValuesOfA.bind(this)}/>
                                                </Form.Item>
                                            </Popover>

                                            <Form.Item label={"B"}>
                                                <InputNumber size="medium" min={1} max={Number((this.state.a) - 1)}
                                                             value={this.state.b}
                                                             onChange={this.handleValuesOfB.bind(this)}/>
                                            </Form.Item>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Row>
                        </Col>
                        <br/>
                        <Col lg={11} md={23} sm={23} xs={23}>
                            <Row>
                                <Card title="Outputs" bordered={false}>
                                    <Form layout={"inline"}>
                                        <Form.Item label={"Mono-Alphabetic Key"}/>
                                    <br/>
                                            <Form.Item label={"D"}>
                                                <InputNumber size="medium" min={1} max={1000000}
                                                             Value={this.state.d}
                                                onChange={this.handleValuesOfD.bind(this)}/>
                                            </Form.Item>
                                            <Form.Item label={"X"}>
                                                <InputNumber size="medium" min={1} max={100000}
                                                             defaultValue={this.state.x}
                                                onChange={this.handleValuesOfX.bind(this)}/>
                                            </Form.Item>
                                            <Form.Item label={"Y"}>
                                                <InputNumber size="medium" min={1} max={100000}
                                                             defaultValue={this.state.y}
                                                onChange={this.handleValuesOfY.bind(this)}/>
                                            </Form.Item>
                                    </Form>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Card ref={'test'} title="Extended-Euclid Algorithm Encoding and Decoding"
                              bordered={false}>
                            <Paragraph>
                                The Extended-Euclid Algorithm is a method that finds the multiplicative inverse
                                m of an integer
                                modulo another integer where <Text code>m = a<sup>-1</sup> mod b</Text>.
                                The input is two non-negative integers a and b such that <Text code>a≥b</Text>.
                                The output is <Text code>d=gcd(a,b)</Text> and integers x and y satisfying
                                <Text code>ax+by=d</Text>.
                            </Paragraph>
                        </Card>
                    </Row>
                </div>
            </div>
        );
    }


}

export default Playfair;
