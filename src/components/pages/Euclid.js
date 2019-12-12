import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Card, Col, Form, Input, InputNumber, PageHeader, Popover, Row, Typography} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
//import {playfairEncrypt, playfairDecrypt} from "../../utils/crypoFunctions";
import {vigenereEncrypt, vigenereDecrypt, euclid, gcd} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";
import {getFrequency} from "../../utils/generalFunctions";

const {Paragraph, Text} = Typography;


class Playfair extends Component {

    state = {
        p: 36163,
        q: 21199,
        d: 1247,
        a: -7,
        b: 12
    };

    handleValuesOfp(value) {
        this.setState({p: Number(value)}, () => this.calculateEuclid());
    }

    handleValuesOfq(value) {
        this.setState({q: Number(value)}, () => this.calculateEuclid());
    }

    handleValuesOfa(value) {
        this.setState({a: Number(value)}, () => this.calculateEuclid());
    }

    handleValuesOfb(value) {
        this.setState({b: Number(value)}, () => this.calculateEuclid());
    }

    handleValuesOfd(value) {
        this.setState({d: Number(value)}, () => this.calculateEuclid());
    }

    calculateEuclid() {
        let [d, a, b] = gcd(this.state.p, this.state.q);
        this.setState({
            d: d,
            a: a,
            b: b
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
                                                <Form.Item label={"p"}>
                                                    <InputNumber size="medium" /*min={Number(this.state.p + 1)}*/
                                                                 //max={1000000}
                                                                 value={this.state.p}
                                                                 onChange={this.handleValuesOfp.bind(this)}/>
                                                </Form.Item>
                                            </Popover>

                                            <Form.Item label={"q"}>
                                                <InputNumber size="medium" /*min={1} max={Number((this.state.p) - 1)}*/
                                                             value={this.state.q}
                                                             onChange={this.handleValuesOfq.bind(this)}/>
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
                                            <Form.Item label={"a"}>
                                                <InputNumber size="medium" /*min={1} max={1000000}*/
                                                             defaultValue={this.state.a}
                                                onChange={this.handleValuesOfa.bind(this)}/>
                                            </Form.Item>
                                            <Form.Item label={"b"}>
                                                <InputNumber size="medium" /*min={1} max={100000}*/
                                                             defaultValue={this.state.b}
                                                onChange={this.handleValuesOfb.bind(this)}/>
                                            </Form.Item>
                                            <Form.Item label={"d"}>
                                                <InputNumber size="medium" /*min={1} max={100000}*/
                                                             defaultValue={this.state.d}
                                                onChange={this.handleValuesOfd.bind(this)}/>
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
                                modulo another integer.
                                The input is two non-negative integers p and q.
                                The output is <Text code>ap + bq = d</Text> where <Text code>d = gcd(p, q)</Text>.
                            </Paragraph>
                        </Card>
                    </Row>
                </div>
            </div>
        );
    }


}

export default Playfair;
