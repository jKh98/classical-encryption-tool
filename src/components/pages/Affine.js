import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Card, Col, Form, InputNumber, PageHeader, Popover, Row, Typography} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
import {affineDecrypt, affineEncrypt} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";
import {getFrequency} from "../../utils/generalFunctions";

const {Paragraph, Text} = Typography;
const a = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

class Affine extends Component {

    state = {
        plainText: 'The quick brown fox jumps over the lazy dog.',
        cipherText: '',
        plainTextMode: 'Text',
        cipherTextMode: 'Text',
        a: a[2],
        b: 8,
        data: [],
    };

    componentDidMount() {
        this.handlePlainTextChange(this.state.plainText);
    }

    handlePlainTextChange(value) {
        let ct = convertFromText(affineEncrypt(this.state.a, this.state.b, convert2Text(value, this.state.plainTextMode)), this.state.cipherTextMode);
        this.setState({
            plainText: value,
            cipherText: ct,
        }, () => this.updateGraph());
    }

    handleCipherTextChange(value) {
        let pt = convertFromText(affineDecrypt(this.state.a, this.state.b, convert2Text(value, this.state.cipherTextMode)), this.state.plainTextMode);
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

    handleValuesOfA(value) {
        this.setState({a: a[Number(value)]}, () => this.handlePlainTextChange(this.state.plainText));
    }

    handleValuesOfB(value) {
        this.setState({b: Number(value)}, () => this.handlePlainTextChange(this.state.plainText));
    }

    render() {
        return (
            <div className="Affine">
                <div>
                    <PageHeader
                        title='Affine Cipher'
                        // tags={<Button
                        //     size={'small'}
                        //     type="primary" ghost
                        //     shape="circle" icon="info" block
                        //     style={{backgroundColor: "transparent"}}/>
                        // }
                    >
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
                                        <Popover content={""}>
                                            <Form.Item label={"SLOPE / A"}>
                                                <InputNumber size="medium" min={0} max={11}
                                                             formatter={value => (a[value])}
                                                             defaultValue={2}
                                                             onChange={this.handleValuesOfA.bind(this)}/>
                                            </Form.Item>
                                        </Popover>

                                        <Form.Item label={"INTERCEPT / B"}>
                                            <InputNumber size="medium" min={1} max={100000}
                                                         defaultValue={this.state.b}
                                                         onChange={this.handleValuesOfB.bind(this)}/>
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
                            <Row>
                                <Card ref={'test'} title="Affine Cipher Encoding and Decoding" bordered={false}>
                                    <Paragraph>
                                        In affine cipher each letter in an alphabet is mapped to its numeric index.
                                        The
                                        letter is then encrypted using a modular arithmetic, and converted back to a
                                        letter
                                        based on the new index. In the English alphabet consisting of <Text
                                        code>26</Text> characters, the function <Text code>(ax + b) mod
                                        26</Text> is used to encipher each letter. The multiplicative inverse
                                        of <Text code>a</Text> exists if <Text
                                        code>a</Text> and <Text code>26</Text> are coprime. Hence values
                                        that <Text code>a</Text> could have are <Text code>1, 3, 5, 7, 9,
                                        11, 15, 17, 19, 21, 23, and 25</Text>. The value <Text
                                        code>b</Text> is the shift of the cipher and could be any arbitrary value
                                        greater than 1. The function used to decode the cipher text is <Text
                                        code>a<sup>-1</sup>(x - b) mod 26</Text>, where <Text
                                        code>a<sup>-1</sup></Text> is the multiplicative inverse of with respect
                                        to <Text code>26</Text>.
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

export default Affine;
