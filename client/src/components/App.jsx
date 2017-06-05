import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/index';
import FindProtest from './FindProtest.jsx';
import Dashboard from './Dashboard.jsx';
import ProtestForm from './ProtestForm.jsx';
import Spinner from './Spinner.jsx';
import { Header, Button, Fist } from './StyledComponents.jsx';
import styled from 'styled-components';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    // this.props.fetchInitData();
    this.props.getUserId();
  }

  updateView(view) {
    this.props.changeView(view);
  }

  render() {

    const currentView = this.props.views.currentView;
    if (currentView === 'SPINNER') {
      return (<Spinner />);
    }
    if (currentView === 'FIND_PROTEST') {
      return (<FindProtest {...this.props} />);
    }
    if (currentView === 'ORGANIZE_PROTEST') {
      return (<ProtestForm {...this.props} />);
    } else {
      return (
        <div>
          <Header>iResist</Header>
          <Fist />
          <Dashboard {...this.props} />
          <div style={{paddingTop: '35px'}}>
            <Button onClick={() => this.updateView('FIND_PROTEST')}>Find a Protest</Button>
            <Button onClick={() => this.updateView('ORGANIZE_PROTEST')}>Organize a Protest</Button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state);
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
