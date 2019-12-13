import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Card, Col, Form, Input, InputNumber, PageHeader, Row, Typography} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
import {playfairEncrypt, playfairDecrypt, playfairMatrix} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";
import {getFrequency} from "../../utils/generalFunctions";

const {Paragraph, Text} = Typography;


class Playfair extends Component {

    state = {
        plainText: 'The quick brown fox jumps over the lazy dog.',
        cipherText: '',
        plainTextMode: 'Text',
        cipherTextMode: 'Text',
        key_matrix: "",
        key: 'PLAYFAIR',
    };

    componentDidMount() {
        this.setState({
            key_matrix: playfairMatrix(this.state.key)
        }, () => {
            this.handlePlainTextChange(this.state.plainText)
        });
    }

    handlePlainTextChange(value) {
        let ct = convertFromText(playfairEncrypt(this.state.key_matrix, convert2Text(value, this.state.plainTextMode)), this.state.cipherTextMode);
        this.setState({
            plainText: value,
            cipherText: ct,
        }, () => this.updateGraph());
    }

    handleCipherTextChange(value) {
        let pt = convertFromText(playfairDecrypt(this.state.key_matrix, convert2Text(value, this.state.cipherTextMode)), this.state.plainTextMode);
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

    handleKeyChange(event) {
        this.setState({
            key: event.target.value,
            key_matrix: playfairMatrix(event.target.value)
        }, () => {
            this.handlePlainTextChange(this.state.plainText)
        });
    }

    render() {
        return (
            <div className="Playfair">
                <div>
                    <PageHeader
                        title='Playfair Cipher'>
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
                                        <Form.Item label={"Key to seed table"}>
                                            <Input defaultValue={this.state.key}
                                                   onChange={this.handleKeyChange.bind(this)}/>
                                        </Form.Item>
                                        <br/>
                                        <Form.Item label={"Key Matrix"}>
                                            <Input.Group compact>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[0]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[1]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[2]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[3]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[4]}
                                                       size={"small"}
                                                       disabled={true}/>
                                            </Input.Group>
                                            <Input.Group compact>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[5]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[6]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[7]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[8]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[9]}
                                                       size={"small"}
                                                       disabled={true}/>
                                            </Input.Group>
                                            <Input.Group compact>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[10]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[11]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[12]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[13]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[14]}
                                                       size={"small"}
                                                       disabled={true}/>
                                            </Input.Group>
                                            <Input.Group compact>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[15]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[16]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[17]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[18]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[19]}
                                                       size={"small"}
                                                       disabled={true}/>
                                            </Input.Group>
                                            <Input.Group compact>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[20]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[21]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[22]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[23]}
                                                       size={"small"}
                                                       disabled={true}/>
                                                <Input style={{width: '20%'}} value={this.state.key_matrix[24]}
                                                       size={"small"}
                                                       disabled={true}/>
                                            </Input.Group>
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
                                <Card ref={'test'} title="Playfair Cipher Encoding and Decoding" bordered={false}>
                                    <Paragraph>
                                        Playfair cipher is a method that encrypts alphabetic text by using a series of
                                        successive Caesar
                                        ciphers (which is effectively an Affine Cipher with <Text code>a = 1</Text>)
                                        based on the letters
                                        of a provided keyword. The cipher
                                        is easy to understand and implement, but it resisted breaking for three
                                        centuries. The complexity of breaking increases with as the keyword length
                                        increases, because the key of the cipher will be reused until it covers all
                                        message characters. Having a keyword of length greater than or equal to the
                                        message length maximizes the usage of different Caesar ciphers.
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