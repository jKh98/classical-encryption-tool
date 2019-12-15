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
                                    <Delayed waitBeforeShow={250}>
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
                                <Card ref={'test'} title="Playfair Cipher Encoding and Decoding" bordered={false}>
                                    <Delayed waitBeforeShow={250}>
                                        <Paragraph>
                                            The Playfair algorithm is based on the use of a <Text code>5x5</Text> matrix
                                            of letters
                                            constructed using a keyword. The matrix is constructed by filling in the
                                            letters of the keyword (minus duplicates) from left to right and from top to
                                            bottom,
                                            and then filling in the remainder of the matrix with the remaining letters
                                            in
                                            alphabetic order. The letters I and J count as one letter. Plaintext is
                                            encrypted two letters at a time, according to the following rules:
                                            <ol>
                                                <li> Repeating plaintext letters that are in the same pair are
                                                    separated with a
                                                    filler letter, such as x.
                                                </li>
                                                <li> Two plaintext letters that fall in the same row of the
                                                    matrix are each
                                                    replaced by the letter to the right, with the first element of the
                                                    row
                                                    circularly
                                                    following the last.
                                                </li>
                                                <li> Two plaintext letters that fall in the same column are
                                                    each replaced by the
                                                    letter beneath, with the top element of the column circularly
                                                    following the
                                                    last.
                                                </li>
                                                <li> Otherwise, each plaintext letter in a pair is replaced by
                                                    the letter that lies
                                                    in its own row and the column occupied by the other plaintext
                                                    letter.
                                                </li>
                                            </ol>
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