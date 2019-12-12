import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import 'antd/dist/antd.css';
import {Layout} from "antd";
import PageNotFound404 from "./components/PageNotFound404";
import {MainMenu} from "./components/MainMenu";
import Affine from "./components/pages/Affine";
import MonoAlphabetic from "./components/pages/MonoAlphabetic";
import Vigenere from "./components/pages/Vigenere";
import Playfair from "./components/pages/Playfair";
import Hill from "./components/pages/Hill";
import Euclid from "./components/pages/Euclid";
import HomeScreen from "./components/HomeScreen";

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
                                                          path="/"
                                                          render={() => {
                                                              this.setSelected(null);
                                                              return <HomeScreen/>;
                                                          }}/>
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
                                                   <Route exact
                                                          path="/Playfair"
                                                          render={() => {
                                                              this.setSelected('Playfair');
                                                              return <Playfair/>;
                                                          }}/>
                                                   <Route exact
                                                          path="/Hill"
                                                          render={() => {
                                                              this.setSelected('Hill');
                                                              return <Hill/>;
                                                          }}/>
                                                   <Route exact
                                                          path="/Extended-Euclid"
                                                          render={() => {
                                                              this.setSelected('Extended-Euclid');
                                                              return <Euclid/>;
                                                          }}/>
                                                   <Route path="/404" component={PageNotFound404}/>
                                                   <Redirect to="/"/>
                                               </Content>
                                           </Layout>
                                       </Layout>
                                   </React.Fragment>)}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
            ;
    }

}

export default App;
