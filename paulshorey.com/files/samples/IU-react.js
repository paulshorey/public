/* core */
import React from 'react';
/* components */
import Layout from 'components/layout/Layout';
import Box from 'components/box/Box';

/* forms */
import { MuiForm, MuiInput } from 'mui-form';
import * as Styled from './PageLoginStyled';

/*
	form
*/

class I extends React.Component {
	render(){return(<p>{this.props.children}</p>);}
}
class U extends React.Component {
	render(){return(<button onClick={this.props.onClick}>{this.props.children}</button>);}
}
class PageComponent extends React.Component {
state={}
giveJob=()=> {this.setState({job:"Modus"})}
render(){return([<I feel={(this.state.job!=="Modus" ? "sad" : "happy!")} />,<U onClick={this.giveJob}/>])}
}


export default PageComponent;
