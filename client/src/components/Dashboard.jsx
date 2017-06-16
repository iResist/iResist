import React from 'react';
import MyProtestList from './MyProtestList.jsx';
import styled from 'styled-components';
import _ from 'lodash';
import { Title, Header, Button, ButtonContainer, DashboardWrapper, StatusTitle } from './StyledComponents.jsx';


class Dashboard extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showPastProtests: false
    };
    this.togglePastProtests = this.togglePastProtests.bind(this);
  }

  togglePastProtests() {
    this.setState({
      showPastProtests: !this.state.showPastProtests
    });
  }

  render() {

    const events = this.props.events.allEvents;

    const upcoming = _.filter(events, event => { return event.status === 'upcoming' });

    const past = _.filter(events, event => { return event.status === 'passed' });

    const ongoing = _.filter(events, event => { return event.status === 'ongoing' });

    return (
      <DashboardWrapper>
      
        <Header>iResist</Header>
  
        <StatusTitle>Ongoing Protests</StatusTitle>
          <MyProtestList eventListType={ongoing} {...this.props} eventType="ongoing"/>

        <StatusTitle>Upcoming Protests</StatusTitle>
          <MyProtestList eventListType={upcoming} {...this.props} eventType="upcoming"/>

  
          <StatusTitle onClick={() => this.togglePastProtests()}>
            Past Protests
            <i className="fa fa-angle-down" style={{paddingLeft: '27px'}}></i>
          </StatusTitle>
  

        { this.state.showPastProtests ? <MyProtestList eventListType={past} {...this.props} eventType="past"/> : <div></div> }

      <ButtonContainer>
        <Button onClick={() => this.props.changeView('FIND_PROTEST')}>
            Find a Protest
          </Button>
        <Button onClick={() => this.props.changeView('ORGANIZE_PROTEST')}>
          Organize a Protest
        </Button>
      </ButtonContainer>
      </DashboardWrapper>
    );
  }
}

export default Dashboard;
