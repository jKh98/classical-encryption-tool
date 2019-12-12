import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Card, Col, Form, Input, PageHeader, Row, Typography} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
//import {playfairEncrypt, playfairDecrypt} from "../../utils/crypoFunctions";
import {vigenereEncrypt, vigenereDecrypt} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";
import {getFrequency} from "../../utils/generalFunctions";

const {Paragraph, Text} = Typography;
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LETTER = 'X';
const MAX_LENGTH = 5;

class Playfair extends Component {

    state = {
        plainText: 'The quick brown fox jumps over the lazy dog.',
        cipherText: '',
        plainTextMode: 'Text',
        cipherTextMode: 'Text',
        key: 'PLAYFAIR',
    };

    componentDidMount() {
        this.handlePlainTextChange(this.state.plainText);
    }

    handlePlainTextChange(value) {
        let ct = convertFromText(vigenereEncrypt(this.state.key, convert2Text(value, this.state.plainTextMode)), this.state.cipherTextMode);
        this.setState({
            plainText: value,
            cipherText: ct,
        }, () => this.updateGraph());
    }

    handleCipherTextChange(value) {
        let pt = convertFromText(vigenereDecrypt(this.state.key, convert2Text(value, this.state.cipherTextMode)), this.state.plainTextMode);
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
            // key: getVigenereKey((event.target.value !== '') ? event.target.value : 'abcdefghijklmnopqrstuvwxyz'),
        }, () => this.handlePlainTextChange(this.state.plainText));
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
                                        <Form.Item label={"Key to seed table: "}>
                                            <Input defaultValue={this.state.key}
                                                   onChange={this.handleKeyChange.bind(this)}/>
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

// // Enhanced - uses a much larger key table and can retain spaces, case, and punctuation
//
// // Create our cipher object that we will store our data in
// window.onload = function() {
//     jQuery.cipher = {
//         key: "", // Initialize a blank key.
//         alpha: "", // Stores our alphabet, used for making the key table.
//         allowed: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_?1234567890.,!@'%-$()=+<>;:*",
//         maxRow: 9, // Rows in the key table.
//         maxCol: 9, // Columns in the key table.
//         nullCh: '*' // Char used to break up duplicate letters and fill uneven pairs.
//     };
//
//     // HTML Table for our key table.
//     function printKey() {
//         var tableHtml = "<table class=\"keyTable\">";
//         for (var i = 0; i < $.cipher.allowed.length; i = i + $.cipher.maxCol) {
//             tableHtml += "<tr class=\"keyRow\">";
//             var row = $.cipher.key.substring(i, i + $.cipher.maxCol);
//             var chars = row.split("");
//             for (var x = 0; x < $.cipher.maxCol; x++) {
//                 tableHtml += "<td class=\"keyValue\">" + chars[x] + "</td>";
//             }
//             tableHtml += "</tr>";
//         }
//         tableHtml += "</table>";
//         $("#keyTable").html(tableHtml);
//     }
//
//     // Fetches the position of a specific character in the table
//     function getCharPosition(c) {
//         var index = $.cipher.key.indexOf(c);
//         var row = Math.floor(index / $.cipher.maxRow);
//         var col = index % $.cipher.maxCol;
//         return {
//             row: row,
//             col: col
//         };
//     }
//
//     // Fetches a character based on the given position
//     // Position must be an object with both row and col attributes.
//     function getCharFromPosition(pos) {
//         var index = pos.row * $.cipher.maxRow;
//         index = index + pos.col;
//         return $.cipher.key.charAt(index);
//     }
//
//     // Applies the Playfair rules to a given set of letters.
//     function encipherPair(str) {
//         if (str.length != 2) return false;
//         var pos1 = getCharPosition(str.charAt(0));
//         var pos2 = getCharPosition(str.charAt(1));
//         var char1 = "";
//
//         // Same Column - Increment 1 row, wrap around to top
//         if (pos1.col == pos2.col) {
//             pos1.row++;
//             pos2.row++;
//             if (pos1.row > $.cipher.maxRow - 1) pos1.row = 0;
//             if (pos2.row > $.cipher.maxRow - 1) pos2.row = 0;
//             char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
//         } else if (pos1.row == pos2.row) { // Same Row - Increment 1 column, wrap around to left
//             pos1.col++;
//             pos2.col++;
//             if (pos1.col > $.cipher.maxCol - 1) pos1.col = 0;
//             if (pos2.col > $.cipher.maxCol - 1) pos2.col = 0;
//             char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
//         } else { // Box rule, use the opposing corners
//             var col1 = pos1.col;
//             var col2 = pos2.col;
//             pos1.col = col2;
//             pos2.col = col1;
//             char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
//         }
//         return char1;
//     }
//
//     // Loops a digraph and passes each letter pair to encipherPair
//     // Returns the cipher in an array
//     function encipher(digraph) {
//         if (!digraph) return false;
//         var cipher = [];
//         for (var i = 0; i < digraph.length; i++) {
//             cipher.push(encipherPair(digraph[i]));
//         }
//         return cipher;
//     }
//
//     // Applies the Playfair rules in reverse to decipher a letter pair
//     function decipherPair(str) {
//         if (str.length != 2) return false;
//         var pos1 = getCharPosition(str.charAt(0));
//         var pos2 = getCharPosition(str.charAt(1));
//         var char1 = "";
//
//         // Same Column - Decrement 1 row, wrap around to bottom
//         if (pos1.col == pos2.col) {
//             pos1.row--;
//             pos2.row--;
//             if (pos1.row < 0) pos1.row = $.cipher.maxRow - 1;
//             if (pos2.row < 0) pos2.row = $.cipher.maxRow - 1;
//             char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
//         } else if (pos1.row == pos2.row) { // Same row - Decrement 1 column, wrap around to right
//             pos1.col--;
//             pos2.col--;
//             if (pos1.col < 0) pos1.col = $.cipher.maxCol - 1;
//             if (pos2.col < 0) pos2.col = $.cipher.maxCol - 1;
//             char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
//         } else { // Box rules, use opposing corners (same as forward)
//             var col1 = pos1.col;
//             var col2 = pos2.col;
//             pos1.col = col2;
//             pos2.col = col1;
//             char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
//         }
//         return char1;
//     }
//
//     // Loops a digraph and passes each letter pair to decipherPair
//     // Returns the plaintext in an array
//     function decipher(digraph) {
//         if (!digraph) return false;
//         var plaintext = [];
//         for (var i = 0; i < digraph.length; i++) {
//             plaintext.push(decipherPair(digraph[i]));
//         }
//         return plaintext;
//     }
//
//     // Turns a string into a digraph
//     // Sanitizes the string, returns the digraph in an array
//     function makeDigraph(str) {
//         if (!str) return false;
//         var digraph = [];
//         str = str.replace(/\s/g, "_");
//         var strArr = str.split("");
//
//         for (var i = 0; i < str.length; i++) {
//             if ($.cipher.allowed.indexOf(strArr[i]) == -1) continue;
//             if (i + 1 >= str.length) digraph.push(strArr[i] + $.cipher.nullCh);
//             else if (strArr[i] == strArr[i + 1]) digraph.push(strArr[i] + $.cipher.nullCh);
//             else digraph.push(strArr[i] + strArr[++i]);
//         }
//         return digraph;
//     }
//
//     // Creates our key table based upon a given key string
//     // Sanitizes the key string, using a default if one is not provided.
//     function generateKeyTable(keystring) {
//         if (!keystring) keystring = "Playfair Cipher Enhanced";
//
//         keystring = keystring.replace(/\s/g, "_");
//         // Reset our key and alphabet
//         $.cipher.key = "";
//         $.cipher.alpha = $.cipher.allowed;
//
//         // Create the start of the table with our key string
//         var keyArr = keystring.split("");
//         $.each(keyArr, function (x, c) {
//             if ($.cipher.alpha.indexOf(c) > -1 && $.cipher.key.indexOf(c) == -1) {
//                 $.cipher.key += c;
//                 $.cipher.alpha = $.cipher.alpha.replace(c, "");
//             }
//         });
//
//         // Fill in the rest of the table
//         // If we enabled randomizing the table, do it. Playfair does not.
//         if ($.cipher.randomTable) $.cipher.key += shuffleStr($.cipher.alpha);
//         else $.cipher.key += $.cipher.alpha;
//     }
//
//     // Handle Events
//     // Display allowed characters
//     $(document).ready(function () {
//         $("#allowedCharacters").html("<b>Allowed Characters:</b><br />" + $.cipher.allowed);
//     });
//     // Generates the table
//     $("#generateKeytable").click(function () {
//         $(this).hide();
//         $("#regenerateKeytable").show();
//         generateKeyTable($("#keyword").val());
//         $("#key").text($.cipher.key);
//         printKey();
//         $("#AfterGen").slideDown();
//     });
//
//     // Regenerates the table
//     $("#regenerateKeytable").click(function () {
//         $("#AfterGen").hide();
//         generateKeyTable($("#keyword").val());
//         $("#key").text($.cipher.key);
//         printKey();
//         $("#AfterGen").slideDown();
//     });
//
//     // Encipher the contents of the textarea
//     $("#encipher").click(function () {
//         var digraph = makeDigraph($("#en").val());
//         if (!digraph) alert("Bad entry");
//         $("#digraph").text("Digraph: '" + digraph.join("' '") + "'");
//         var cipher = encipher(digraph);
//         $("#de").val(cipher.join(""));
//     });
//
//     // Deciphers the contents of the textarea
//     $("#decipher").click(function () {
//         var digraph = makeDigraph($("#de").val());
//         if (!digraph) alert("Bad entry");
//         $("#digraph").text("Digraph: '" + digraph.join("' '") + "'");
//         var plainArr = decipher(digraph);
//         var plaintext = plainArr.join("");
//         plaintext = plaintext.replace(/_/g, " ");
//         plaintext = plaintext.replace(/\*/g, "");
//         $("#en").val(plaintext);
//     });
// }