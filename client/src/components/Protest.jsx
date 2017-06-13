import React from 'react';
import dateFormat from 'dateformat';
import MapContainer from './MapContainer.jsx';
import EventButton from './EventButton.jsx';
import styled from 'styled-components';
import { Status, Title, Name, Info, Icon } from './StyledComponents.jsx';



class Protest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDetails: false,
    };

    this.handleProtestClick = this.handleProtestClick.bind(this);
  }

  handleProtestClick() {
    if (this.props.eventType === 'ongoing') {
      this.props.setDayOfEvent(this.props.protestId);
      this.props.fetchDayOfData(this.props.user.userId, this.props.protestId, 'DAY_OF');
    } else {
      this.setState({
        displayDetails: !this.state.displayDetails
      });
    }
  }

  render() {

    const localOffsetToEvent = parseInt(new Date().toString().split('-')[1]) * 36000 + Number(this.props.protest.tzOffset);
    const startTime = new Date(Number(this.props.protest.time) + localOffsetToEvent);
    const endTime = new Date(Number(this.props.protest.time) + Number(this.props.protest.duration) + Number(localOffsetToEvent));
    const status = this.props.protest.status;
    const leader = this.props.role !== 'attending' && this.props.role !== 'none';
    const userId = this.props.user.userId;

    if (this.state.displayDetails) {
      return (
        <div>
          <Name onClick={this.handleProtestClick}>{this.props.protest.name}</Name>
          <Info>
            <p><b>Cause:</b> {this.props.protest.cause}</p>
            <p><b>Start:</b> {dateFormat(startTime, 'mmmm dd, yyyy: h:MM TT')}</p>
            <p><b>End:</b> {dateFormat(endTime, 'mmmm dd, yyyy: h:MM TT')}</p>
            <p><b>Address:</b> {this.props.protest.address}</p>
            <p><b>Description:</b> {this.props.protest.description}</p>
            <p><b>Attendee Count:</b> {this.props.protest.attendee_count}</p>
          </Info>
          <MapContainer {...this.props} mapType='dashboardMap' />
          <EventButton {...this.props} leader={leader} userId={userId} protestId={this.props.protest.id} />
        </div>
      );
    } else {
      return (
        <div>
           <Title onClick={this.handleProtestClick}>
            {this.props.protest.name}
            {/*<Status>{this.props.protest.status}</Status>*/}
            {leader ? <Icon src="images/leaderIcon.svg" /> : <div></div>}
          </Title>
        </div>
      );
    }
  }
}

export default Protest;
