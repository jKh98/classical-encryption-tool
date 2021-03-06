import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Alert, Button, Card, Col, Form, Input, InputNumber, message, PageHeader, Popover, Row, Typography} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
import {hillEncrypt, hillDecrypt, inverseKeyMatrix} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";
import {checkIfBinary, checkIfHex, getFrequency} from "../../utils/generalFunctions";

const {Paragraph, Text} = Typography;

class Playfair extends Component {

    state = {
        plainText: 'The quick brown fox jumps over the lazy dog.',
        cipherText: '',
        plainTextMode: 'Text',
        cipherTextMode: 'Text',
        a: 5,
        b: 17,
        c: 4,
        d: 15,
        inv_a: 17,
        inv_b: -21,
        inv_c: -8,
        inv_d: 75,
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
            a: Number(value),
            mode: 1
        });
    }

    handleChangeB(value) {
        this.setState({
            b: Number(value),
            mode: 1
        });
    }

    handleChangeC(value) {
        this.setState({
            c: Number(value),
            mode: 1
        },);
    }

    handleChangeD(value) {
        this.setState({
            d: Number(value),
            mode: 1
        });
    }

    handleKeyChange() {
        let inv_key = inverseKeyMatrix([this.state.a, this.state.b, this.state.c, this.state.d]);
        if (inv_key.length < 4) {
            this.setState({
                mode: 3
            });
            return;
        }
        let key = this.state.a + " " + this.state.b + " " + this.state.c + " " + this.state.d;
        this.setState({
            inv_a: inv_key[0],
            inv_b: inv_key[1],
            inv_c: inv_key[2],
            inv_d: inv_key[3],
            key: key,
            mode: 2
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
                                    <Delayed waitBeforeShow={250}>
                                        {
                                            (this.state.mode === 3) ? (
                                                <Alert message="This key cannot be used for decryption, try another one"
                                                       type="error" showIcon/>) : (
                                                (this.state.mode === 1) ?
                                                    <Alert
                                                        message="Make sure to submit the new key when you change the matrix"
                                                        type="info" showIcon/> :
                                                    <Alert message={"Key matrix was updated."}
                                                           type="success" showIcon/>
                                            )
                                        }
                                        <br/>
                                        <Row>
                                            <Col lg={11} md={23} sm={23} xs={23}>
                                                <p>Key Matrix</p>
                                                <Form layout={"inline"} title={"Key Matrix"}>
                                                    <Form.Item>
                                                        <Input.Group compact>
                                                            <Popover content={"a"}>
                                                                <InputNumber value={this.state.a}
                                                                             onChange={this.handleChangeA.bind(this)}/>
                                                            </Popover>
                                                            <Popover content={"b"}>
                                                                <InputNumber value={this.state.b}
                                                                             onChange={this.handleChangeB.bind(this)}/>
                                                            </Popover>
                                                        </Input.Group>
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Input.Group compact>
                                                            <Popover content={"c"}>
                                                                <InputNumber value={this.state.c}
                                                                             onChange={this.handleChangeC.bind(this)}/>
                                                            </Popover>
                                                            <Popover content={"d"}>
                                                                <InputNumber value={this.state.d}
                                                                             onChange={this.handleChangeD.bind(this)}/>
                                                            </Popover>
                                                        </Input.Group>
                                                    </Form.Item>
                                                </Form>
                                            </Col>
                                            <Col lg={11} md={23} sm={23} xs={23}>
                                                <p>Inverse Key Matrix</p>
                                                <Form layout={"inline"} title={"Inverse Key Matrix"}>
                                                    <Form.Item>
                                                        <Input.Group compact>
                                                            <Popover content={<p>a<sup>-1</sup></p>}>
                                                                <InputNumber value={this.state.inv_a}
                                                                             disabled={true}/>
                                                            </Popover>
                                                            <Popover content={<p>b<sup>-1</sup></p>}>
                                                                <InputNumber value={this.state.inv_b}
                                                                             disabled={true}/>
                                                            </Popover>
                                                        </Input.Group>
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Input.Group compact>
                                                            <Popover content={<p>c<sup>-1</sup></p>}>
                                                                <InputNumber value={this.state.inv_c}
                                                                             disabled={true}/>
                                                            </Popover>
                                                            <Popover content={<p>d<sup>-1</sup></p>}>
                                                                <InputNumber value={this.state.inv_d}
                                                                             disabled={true}/>
                                                            </Popover>
                                                        </Input.Group>
                                                    </Form.Item>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Button type="primary" onClick={this.handleKeyChange.bind(this)}>
                                            Submit Key
                                        </Button>
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
                            <br/>
                            <Row>
                                <Card ref={'test'} title="Hill Cipher Encoding and Decoding" bordered={false}>
                                    <Delayed waitBeforeShow={250}>
                                        <Paragraph>
                                            Hill cipher is a is a polygraphic substitution cipher based on linear
                                            algebra
                                            that aims at encrypting multiple symbols at a time.
                                            To encrypt a message, each block of <Text code>n</Text> letters is
                                            multiplied by
                                            a key which is an
                                            invertible <Text code>n × n</Text> matrix (in our case <Text code>2x2</Text>),
                                            with <Text code>modulus 26</Text>.
                                            To decrypt the message, each block is multiplied by the inverse of the
                                            matrix
                                            (or key) used for encryption.
                                            The key should be chosen randomly from the set of invertible <Text code>n ×
                                            n</Text> matrices
                                            <Text code>(modulo 26)</Text>.
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

export default Playfair;
