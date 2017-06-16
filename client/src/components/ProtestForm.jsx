import React from 'react';
import { connect } from 'react-redux';
// import { HomeIcon, Form, InputInfo, Input, Text, Label, Search } from "./StyledComponents.jsx";
import { HomeIcon, Form, FormWrapper, Input, Label, Text, Search, Submit, SearchIcon, CancelEvent } from "./StyledComponents.jsx";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import _ from "lodash";
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import tzlookup from 'tz-lookup';
import styled from 'styled-components';

class ProtestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.views.optionalEventId || '',
      name: '',
      userId: this.props.user.userId,
      description: '',
      cause: '',
      address: '',
      date: '',
      timeStart: '',
      timeEnd: '',
      lat: 0,
      long: 0,
      protests: [],
      zoom: 1,
      timezone: '',
      isEditing: this.props.views.optionalEventId ? true : false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocSearch = this.handleLocSearch.bind(this);
    this.getEventData = this.getEventData.bind(this);
  }


  componentDidMount() {
    if (this.state.isEditing) {
      this.getEventData();
    }
  }

  getEventData() {
    let event = _.find(this.props.events.allEvents, event => {
      return event.id === this.props.views.optionalEventId;
    });
    let wholeDate = JSON.stringify(new Date(Number(event.time)));
    let day = wholeDate.split('').slice(1, 11).join('');
    this.setState({
      name: event.name,
      description: event.description,
      cause: event.cause,
      address: event.address,
      date: day
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.isEditing
      ? this.props.updateEvent(this.state, this.props.user.userId)
      : this.props.postEvent(this.state, this.props.user.userId);
  }

  handleLocSearch() {
    axios
      .get('/api/geocoder', {
        params: {
          address: this.state.address
        }
      })
      .then(response => {
        this.setState({
          lat: response.data[0].latitude,
          long: response.data[0].longitude,
          protests: [[response.data[0].latitude, response.data[0].longitude]],
          zoom: 14
        });
      })
      .catch(error => {
        console.log('ERROR: ', error);
      });
  }

  validTime(startTimeString, endTimeString) {
    var startTime = Number(startTimeString.split(':').join(''));
    var endTime = Number(endTimeString.split(':').join(''));
    var timezone1 = tzlookup(this.state.lat, this.state.long);
    var timestamp1 = Date.now();
    var validDate1 = moment.tz(timestamp1, timezone1).format().slice(0, 10);
    var today = validDate1 === this.state.date;
    var currentTime = moment.tz(timestamp1, timezone1).format().slice(11, 16).split(':').slice(0, 2).join('');
    if (today && currentTime > startTime) {
      return false;
    }
    if (endTime < startTime) {
      return false;
    }
    return true;
  }

  render() {
    const { name, address, date, timeStart, timeEnd, lat, long } = this.state;
    var timezone = tzlookup(this.state.lat, this.state.long);
    var timestamp = Date.now();
    var validDate = moment.tz(timestamp, timezone).format().slice(0, 10);

    const formValid =
      name.length > 0 &&
      address.length > 0 &&
      date.length > 0 &&
      timeStart.length &&
      timeEnd.length &&
      this.validTime(this.state.timeStart, this.state.timeEnd) &&
      lat !== 0 &&
      long !== 0;

    return (
      <FormWrapper>
        <Form>
          <legend>Revolution Starts Here</legend>
          <label>
            Name
            <br />
            <Input
              type="text"
              value={this.state.name}
              placeholder="ex: Snazzy Protest Name"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </label>
          {' '}
          <br />
          <label>
            Cause
            <br />
            <Input
              type="text"
              value={this.state.cause}
              placeholder="ex: Black Lives Matter, Red Cross"
              onChange={e => this.setState({ cause: e.target.value })}
            />
          </label>
          {' '}
          <br />
          <label>
            Description
            <br />
            <Text
              value={this.state.description}
              placeholder="Tell the masses what's up!"
              onChange={e => this.setState({ description: e.target.value })}
              rows="4"
              cols="30"
            />
          </label>
          {' '}
          <br />
          <label>
            Location
            <br />

            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
              <Input
                style={{borderRight: 'none'}}
                type="text"
                value={this.state.address}
                placeholder="Include a place or address"
                onChange={e => this.setState({ address: e.target.value })}
              />
              <SearchIcon className="fa fa-search" onClick={this.handleLocSearch}></SearchIcon>
            </div>

          </label>
          {' '}
          <br />
          <Map
            className="add-protest-map"
            center={[this.state.lat, this.state.long]}
            zoom={this.state.zoom}
          >
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {this.state.protests.map((position, i) =>
              <Marker key={`marker-${i}`} position={position} />
            )}
          </Map>
          <br />
          <label>
            Date / Time
            <br />
            <Input
              type="date"
              value={this.state.date}
              min={validDate}
              onChange={e => this.setState({ date: e.target.value })}
            />
            {' '}
            <Input
              type="time"
              value={this.state.timeStart}
              onChange={e => this.setState({ timeStart: e.target.value })}
            />
            <Input
              type="time"
              value={this.state.timeEnd}
              onChange={e => this.setState({ timeEnd: e.target.value })}
            />
          </label>
          {' '}
          <br />
          {' '}
          <br />

          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <Submit
              type="submit"
              value="Submit"
              disabled={!formValid}
              onClick={ e => this.handleSubmit(e) }
            />
            <Submit
              type="button"
              value="Cancel"
              onClick={() => this.props.changeView("DASHBOARD")}
            />
  
          {this.state.isEditing ?
            <CancelEvent type="button" value="Cancel Event" onClick={() => { this.props.deleteEvent(this.state.eventId); this.props.changeView('DASHBOARD'); }} /> :
            <div></div>
          }
          </div>
        </Form>
      </FormWrapper>
    );
  }
}

const InputButton = styled.input`
  margin: 0 auto;
`;


export default ProtestForm;
