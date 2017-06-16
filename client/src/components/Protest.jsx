import React from 'react';
import dateFormat from 'dateformat';
import MapContainer from './MapContainer.jsx';
import EventButton from './EventButton.jsx';
import styled from 'styled-components';
import { DayOfContentWrapper, ToggledProtest, Status, Title, Name, Info, Icon, InfoTag, T, Description } from './StyledComponents.jsx';
import $ from "jquery";



class Protest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDetails: false,
      currentTempF: 0,
      currentTempC: 0,
      currentWeatherDescription: ""
    };

    this.handleProtestClick = this.handleProtestClick.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.testfunction = this.testfunction.bind(this);
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

  fetchWeather(latitude, longitude) {
    setInterval(
      function () {
      $.ajax({
        type: "GET",
        dataType: "json",
        url: `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`,
        data: { appid: "a9fd24a0eca2feb059652443891fb8b7" },
        success: (weather) => {
          this.setState({
            currentTempF: Math.round(weather.main.temp * (9/5) - 459.67),
            currentTempC: Math.round(weather.main.temp - 273.15),
            currentWeatherDescription: weather.weather[0].main
          })
        }
        });
      }, 180000
    );
  }
  
  testfunction() {		
    setInterval(		
      function test() {		
         console.log('i have been invoked!')		
         return test;
      }(), 4000);		
 }		


  render() {
    const localOffsetToEvent = parseInt(new Date().toString().split('-')[1]) * 36000 + Number(this.props.protest.tzOffset);
    const startTime = new Date(Number(this.props.protest.time) + localOffsetToEvent);
    const endTime = new Date(Number(this.props.protest.time) + Number(this.props.protest.duration) + Number(localOffsetToEvent));
    const status = this.props.protest.status;
    const leader = this.props.role !== 'attending' && this.props.role !== 'none';
    const userId = this.props.user.userId;
    const mapId = this.props.protest.mapId;

    var latitude = this.props.maps.allMaps[mapId].lat;
    var longitude = this.props.maps.allMaps[mapId].long;

    if (this.state.displayDetails) {
      return (
        <ToggledProtest>
          <Name onClick={this.handleProtestClick}>{this.props.protest.name}</Name>
          <Info>
          
            <T><InfoTag>Cause</InfoTag> <p>{this.props.protest.cause}</p></T>
        
            <div style={{display: 'flex'}}>
              <T><InfoTag>Time</InfoTag> <p>{dateFormat(startTime, 'mmmm dd, yyyy: h:MM TT')} to {dateFormat(endTime, 'h:MM TT')}</p></T>
            </div>
            <T><InfoTag>Address</InfoTag> <p>{this.props.protest.address}</p></T>
            <T><InfoTag>Current Weather</InfoTag> <p>{this.state.currentTempF + "ºF / " + this.state.currentTempC + "ºC " + this.state.currentWeatherDescription}</p></T>
            <T><InfoTag>RSVP'd</InfoTag> <p>{this.props.protest.attendee_count}</p></T>
            <T><InfoTag>Description</InfoTag> <Description>{this.props.protest.description}</Description></T>
          </Info>
          <MapContainer {...this.props} mapType='dashboardMap' />
          <EventButton {...this.props} leader={leader} userId={userId} protestId={this.props.protest.id} />
        </ToggledProtest>
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
