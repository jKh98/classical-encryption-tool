import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Button, Card, Col, Form, Input, PageHeader, Row} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
import {monoAlphabeticDecrypt, monoAlphabeticEncrypt} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";
import {getFrequency} from "../../utils/generalFunctions";

class MonoAlphabetic extends Component {

    state = {
        plainText: 'hello',
        cipherText: '',
        plainTextMode: 'Text',
        cipherTextMode: 'Text',
        key: 'abcdefghijklmnopqrstuvwxyz',
        data: [],
    };

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
        }, () => this.handlePlainTextChange(this.state.plainText))
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
                                    <Form layout={"inline"}>
                                        <Form.Item label={"Mono-Alphabetic Key"}>
                                            <Input value={this.state.key}
                                                   type={''}/>
                                            <Button onClick={this.handleButtonClick.bind(this)}
                                                    type="primary">Shuffle</Button>
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
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default MonoAlphabetic;
