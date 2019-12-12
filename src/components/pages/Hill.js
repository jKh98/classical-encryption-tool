import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Card, Col, Form, Input, InputNumber, PageHeader, Row, Typography} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
import {hillEncrypt, hillDecrypt} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";
import {getFrequency} from "../../utils/generalFunctions";

const {Paragraph, Text} = Typography;

class Playfair extends Component {

    state = {
        plainText: 'The quick brown fox jumps over the lazy dog.',
        cipherText: '',
        plainTextMode: 'Text',
        cipherTextMode: 'Text',
        a: "5",
        b: "17",
        c: "4",
        d: "15",
        key: "5 17 4 15",
        data: [],
    };

    componentDidMount() {
        this.handlePlainTextChange(this.state.plainText);
    }

    handlePlainTextChange(value) {
        let ct = convertFromText(hillEncrypt(this.state.key, convert2Text(value, this.state.plainTextMode)), this.state.cipherTextMode);
        this.setState({
            plainText: value,
            cipherText: ct,
        }, () => this.updateGraph());
    }

    handleCipherTextChange(value) {
        let pt = convertFromText(hillDecrypt(this.state.key, convert2Text(value, this.state.cipherTextMode)), this.state.plainTextMode);
        this.setState({
            plainText: pt,
            cipherText: value,
        });
    }

    updateGraph() {
        this.setState({
            data: getFrequency(convert2Text(this.state.cipherText, this.state.cipherTextMode)),
        });
    }

    handlePlainTextModeChange(newMode) {
        let pt = convert(this.state.plainText, this.state.plainTextMode, newMode);
        this.setState({
            plainTextMode: newMode,
        }, () => this.handlePlainTextChange(pt));
    }

    handleCipherTextModeChange(newMode) {
        let ct = convert(this.state.cipherText, this.state.cipherTextMode, newMode);
        this.setState({
            cipherTextMode: newMode,
        }, () => this.handleCipherTextChange(ct));
    }

    handleChangeA(value) {
        this.setState({
            a: value || 5,
        }, () => this.handleKeyChange());
    }

    handleChangeB(value) {
        this.setState({
            b: value || 17,
        }, () => this.handleKeyChange());
    }

    handleChangeC(value) {
        this.setState({
            c: value || 4,
        }, () => this.handleKeyChange());
    }

    handleChangeD(value) {
        this.setState({
            d: value || 15,
        }, () => this.handleKeyChange());
    }

    handleKeyChange() {
        let key = this.state.a + " " + this.state.b + " " + this.state.c + " " + this.state.d;
        this.setState({
            key: key,
        }, () => this.handlePlainTextChange(this.state.plainText));
    }

    render() {
        return (
            <div className="Hill">
                <div>
                    <PageHeader
                        title='Hill Cipher'>
                    </PageHeader>
                </div>
                <div>
                    <Row type="flex" justify="space-around" align="top">
                        <Col lg={11} md={23} sm={23} xs={23}>
                            <TextContainerCoupler plainText={this.state.plainText}
                                                  cipherText={this.state.cipherText}
                                                  plainTextMode={this.state.plainTextMode}
                                                  cipherTextMode={this.state.cipherTextMode}
                                                  handlePlainTextChange={this.handlePlainTextChange.bind(this)}
                                                  handleCipherTextChange={this.handleCipherTextChange.bind(this)}
                                                  handlePlainTextModeChange={this.handlePlainTextModeChange.bind(this)}
                                                  handleCipherTextModeChange={this.handleCipherTextModeChange.bind(this)}/>
                        </Col>
                        <Col lg={11} md={23} sm={23} xs={23}>
                            <Row>
                                <Card title="Encryption Parameters" bordered={false}>
                                    <Form layout={"inline"}>
                                        <Form.Item label={"Key Matrix"}>
                                            <InputNumber value={this.state.a}
                                                         onChange={this.handleChangeA.bind(this)}/>
                                            <br/>
                                            <InputNumber value={this.state.c}
                                                         onChange={this.handleChangeC.bind(this)}/>
                                        </Form.Item>
                                        <Form.Item>
                                            <InputNumber value={this.state.b}
                                                         onChange={this.handleChangeB.bind(this)}/>

                                            <br/>
                                            <InputNumber value={this.state.d}
                                                         onChange={this.handleChangeD.bind(this)}/>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Row>
                            <br/>
                            <Row>
                                <Card title="Letter Frequency" bordered={false}>
                                    <Delayed waitBeforeShow={500}>
                                        <CustomGraph type='line'
                                                     data={this.state.data}/>
                                    </Delayed>
                                </Card>
                            </Row>
                            <br/>
                            <br/>
                            <Row>
                                <Card ref={'test'} title="Hill Cipher Encoding and Decoding" bordered={false}>
                                    <Paragraph>
                                        Hill cipher is a is a polygraphic substitution cipher based on linear algebra
                                        that aims at encrypting multiple symbols at a time.
                                        To encrypt a message, each block of <Text code>n</Text> letters is multiplied by
                                        a key which is an
                                        invertible <Text code>n × n</Text> matrix (in our case <Text code>2x2</Text>),
                                        with <Text code>modulus 26</Text>.
                                        To decrypt the message, each block is multiplied by the inverse of the matrix
                                        (or key) used for encryption.
                                        The key should be chosen randomly from the set of invertible <Text code>n ×
                                        n</Text> matrices
                                        <Text code>(modulo 26)</Text>.
                                    </Paragraph>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Playfair;
