import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'antd/dist/antd.css';
import {Layout} from "antd";
import PageNotFound404 from "./components/PageNotFound404";
import {MainMenu} from "./components/MainMenu";
import Affine from "./components/pages/Affine";
import MonoAlphabetic from "./components/pages/MonoAlphabetic";
import Vigenere from "./components/pages/Vigenere";


const {Content} = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "",
        }
    }

    setSelected(selected) {
        console.log(selected);
        if (this.state.selected !== selected) {
            this.setState({
                selected: selected,
            })
        }
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path={"/"}
                               render={() => (
                                   <React.Fragment>
                                       <Layout style={{minHeight: '100vh'}}>
                                           <MainMenu selected={this.state.selected}/>
                                           <Layout>
                                               <Content style={{margin: '0 16px'}}>
                                                   <Route exact
                                                          path="/Affine"
                                                          render={() => {
                                                              this.setSelected('Affine');
                                                              return <Affine/>;
                                                          }}/>
                                                   <Route exact
                                                          path="/Mono-Alphabetic"
                                                          render={() => {
                                                              this.setSelected('Mono-Alphabetic');
                                                              return <MonoAlphabetic/>;
                                                          }}/>
                                                   <Route exact
                                                          path="/Vigenere"
                                                          render={() => {
                                                              this.setSelected('Vigenere');
                                                              return <Vigenere/>;
                                                          }}/>
                                               </Content>
                                           </Layout>
                                       </Layout>
                                   </React.Fragment>)}/>
                        <Route exact path="*" component={PageNotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
            ;
    }

}

export default App;
