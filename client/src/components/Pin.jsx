import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import AutoOpenMarker from './AutoOpenMarker.jsx';
import prettyMs from 'pretty-ms';
import {
  PinVoteHolder,
  VoteImage,
  CredCount,
  PinWrapper,
  PinContent,
  ItemUserName,
  TimeStamp,
  TimeImage,
  PinVoteDown,
  PinVoteUp,
  ErrorMsg,
  PinTextInput,
  PinSubmit } from './StyledComponents.jsx';

class Pin extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      inputPinText: '',
      displayAge: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCred = this.handleCred.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handlePinSubmit(this.state.inputPinText, this.props.lat, this.props.long);
  }

  handleClick(e) {
    const msDif = Date.now() - this.props.age;
    const newDisplayAge = prettyMs(msDif, {secDecimalDigits: 0});
    this.setState({
      displayAge: newDisplayAge
    });
  }

  handleCred(polarity) {
    this.props.handleCredChange(polarity, this.props.userId, this.props.pinId);
  }

  render () {
    if (this.props.type === 'display') {
      return (
        <Marker position={[this.props.lat, this.props.long]} onClick={e => this.handleClick(e)}>
          <Popup>
            <PinWrapper style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
              <PinVoteHolder>
                <PinVoteUp className="fa fa-caret-up fa-lg" onClick={e => this.handleCred(1)}></PinVoteUp>
                <CredCount>{this.props.pinCred}</CredCount>
                <PinVoteDown className="fa fa-caret-down fa-lg" onClick={e => this.handleCred(-1)}></PinVoteDown>
              </PinVoteHolder>
              <PinContent>
                <ItemUserName>{this.props.user}</ItemUserName>
                <TimeStamp><TimeImage src='images/Clock.svg'/>{this.state.displayAge} ago</TimeStamp>
                <div>{this.props.text}</div>
                {this.props.pinError ? <ErrorMsg>{this.props.pinError}</ErrorMsg> : <div></div>}
              </PinContent>
            </PinWrapper>
          </Popup>
        </Marker>
      );
    } else {
      return (
        <AutoOpenMarker position={[this.props.lat, this.props.long]} keyboard={false}>
          <Popup>
            <form onSubmit={ e => this.handleSubmit(e) }>
              <PinTextInput
                type="text"
                value={this.state.inputPinText}
                placeholder="What's going on?"
                onChange={e => this.setState({ inputPinText: e.target.value })}
                autoFocus
              />
              <PinSubmit
                type="submit"
                value="Submit"
              />
            </form >
          </Popup>
        </AutoOpenMarker>
      );
    }
  }
}

export default Pin;
