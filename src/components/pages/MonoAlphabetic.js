import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Button, Card, Col, Form, Input, PageHeader, Row, Typography} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
import {monoAlphabeticDecrypt, monoAlphabeticEncrypt} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";
import {getFrequency} from "../../utils/generalFunctions";

const {Paragraph} = Typography;

class MonoAlphabetic extends Component {

    state = {
        plainText: 'The quick brown fox jumps over the lazy dog.',
        cipherText: '',
        plainTextMode: 'Text',
        cipherTextMode: 'Text',
        key: 'abcdefghijklmnopqrstuvwxyz',
        data: [],
    };

    componentDidMount() {
        this.handlePlainTextChange(this.state.plainText);
    }

    handlePlainTextChange(value) {
        let ct = convertFromText(monoAlphabeticEncrypt(this.state.key, convert2Text(value, this.state.plainTextMode)), this.state.cipherTextMode);
        this.setState({
            plainText: value,
            cipherText: ct,
        }, () => this.updateGraph());
    }

    handleCipherTextChange(value) {
        let pt = convertFromText(monoAlphabeticDecrypt(this.state.key, convert2Text(value, this.state.cipherTextMode)), this.state.plainTextMode);
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

    handleButtonClick() {
        this.setState({
            key: this.state.key.split('').sort(function () {
                return 0.5 - Math.random()
            }).join(''),
        }, () => this.handlePlainTextChange(this.state.plainText));
    }

    render() {
        return (
            <div className="MonoAlphabetic">
                <div>
                    <PageHeader
                        title='MonoAlphabetic Cipher'>
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
                                    <Delayed waitBeforeShow={250}>
                                        <Form layout={"inline"}>
                                            <Form.Item label={"Mono-Alphabetic Key"}>
                                                <Input value={this.state.key}
                                                       type={''}/>
                                                <Button onClick={this.handleButtonClick.bind(this)}
                                                        type="primary">Shuffle</Button>
                                            </Form.Item>
                                        </Form>
                                    </Delayed>
                                </Card>
                            </Row>
                            <br/>
                            <Row>
                                <Card title="Letter Frequency" bordered={false}>
                                    <Delayed waitBeforeShow={250}>
                                        <CustomGraph type='line'
                                                     data={this.state.data}/>
                                    </Delayed>
                                </Card>
                            </Row>
                            <br/>
                            <Row>
                                <Card ref={'test'} title="Mono-Alphabetic Cipher Encoding and Decoding"
                                      bordered={false}>
                                    <Delayed waitBeforeShow={250}>
                                        <Paragraph>
                                            A monoalphabetical cipher fixes an alphabetical substitution to be used for
                                            the
                                            entire message. The substitution randomly shuffles the original alphabetical
                                            order and maps the original index of each letter to a new index based on the
                                            new
                                            jumbled sequence . The new alphabetical sequence may be a shifted, reversed,
                                            mixed or deranged version of the original alphabet alphabet. Knowing the new
                                            and
                                            the
                                            original sequences allows for easy encryption and decryption.
                                        </Paragraph>
                                    </Delayed>
                                </Card>
                            </Row>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default MonoAlphabetic;
