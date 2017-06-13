import React from "react";
import { connect } from "react-redux";
import { HomeIcon } from "./StyledComponents.jsx";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import _ from "lodash";
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import tzlookup from 'tz-lookup';

class ProtestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.views.optionalEventId || "",
      name: "",
      userId: this.props.user.userId,
      description: "",
      cause: "",
      address: "",
      date: "",
      timeStart: "",
      timeEnd: "",
      lat: 0,
      long: 0,
      protests: [],
      zoom: 1,
      timezone: "",
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
    let day = wholeDate.split("").slice(1, 11).join("");
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
      ? this.props.updateEvent(this.state)
      : this.props.postEvent(this.state);
    this.props.changeView("DASHBOARD");
  }

  handleLocSearch() {
    axios
      .get("/api/geocoder", {
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
        console.log("ERROR: ", error);
      });
  }

  validTime(startTimeString, endTimeString) {
    var startTime = Number(startTimeString.split(":").join(""));
    var endTime = Number(endTimeString.split(":").join(""));
    var timezone1 = tzlookup(this.state.lat, this.state.long);
    var timestamp1 = Date.now();
    var validDate1 = moment.tz(timestamp1, timezone1).format().slice(0, 10);
    var today = validDate1 === this.state.date;
    var currentTime = moment.tz(timestamp1, timezone1).format().slice(11, 16).split(":").slice(0, 2).join("");
    // console.log('this is the current time: ', currentTime);
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
    console.log(moment.tz(timestamp, timezone).format());

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
      <div>
        <HomeIcon
          className="fa fa-home fa-lg"
          onClick={() => this.props.changeView("DASHBOARD")}
        />
        <form>
          <label>
            Protest Name:
            <input
              type="text"
              value={this.state.name}
              placeholder="Required"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </label>
          {" "}
          <br />
          <label>
            Cause:
            <input
              type="text"
              value={this.state.cause}
              onChange={e => this.setState({ cause: e.target.value })}
            />
          </label>
          {" "}
          <br />
          <label>
            Description:
            <textarea
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </label>
          {" "}
          <br />
          <label>
            Address:
            <input
              type="text"
              value={this.state.address}
              placeholder="Include an address"
              onChange={e => this.setState({ address: e.target.value })}
            />
            <input
              type="button"
              value="Find location on map"
              onClick={this.handleLocSearch}
            />
          </label>
          {" "}
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
          <label>
            Choose a date:
            <input
              type="date"
              value={this.state.date}
              min={validDate}
              onChange={e => this.setState({ date: e.target.value })}
            />
          </label>
          {" "}
          <br />
          <label>
            Choose the time range:
            <input
              type="time"
              value={this.state.timeStart}
              onChange={e => this.setState({ timeStart: e.target.value })}
            />
            <input
              type="time"
              value={this.state.timeEnd}
              onChange={e => this.setState({ timeEnd: e.target.value })}
            />
          </label>
          {" "}
          <br />
          <input
            type="submit"
            value="Submit"
            disabled={!formValid}
            onClick={ e => this.handleSubmit(e) }
          />
          <input
            type="button"
            value="Cancel"
            onClick={() => this.props.changeView("DASHBOARD")}
          />
          {this.state.isEditing ?
            <input type="button" value="CANCEL EVENT" onClick={() => {this.props.deleteEvent(this.state.eventId); this.props.changeView('DASHBOARD')}} /> :
            <div></div>
          }
        </form>
      </div>
    );
  }
}

export default ProtestForm;
