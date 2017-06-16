import React from 'react';
import styled from 'styled-components';


export const Fist = styled.div`
  background-image: url("images/fist.png");
  background-size: 50% 50%
`;

export const HomeIcon = styled.i`
  padding-left: 3px;
  padding-bottom: 10px;
  color: tomato;
  aria-hidden: true;
`;

export const ButtonContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 35px;
`;

export const Button = styled.div`
  color: tomato;
  font-family: 'Open Sans', sans-serif;
	font-size: 1em;
  text-align: center;
	margin-bottom: 17px;
	padding: 8px 10px;
  width: 80vw;
	border: 1px solid tomato;
	border-radius: 3px;
  line-height: 22px;
`;

export const EditButton = Button.extend`
  display: block;
  color: #ada3a3;
  border-color: #ada3a3;
  margin-top: 20px;
`;

export const AttendButton = Button.extend`
  margin-top: 20px;
`;

export const AbandonButton = Button.extend`
  margin-top: 20px;
`;

export const DownCaret = styled.img`
  padding-left: 15px;
  padding-top: 10px;

`;

export const Status = styled.span`
  size: 10px;
  color: lightgrey;
  padding-left: 5px;
`;


export const Title = styled.div`
  font-family: 'Open Sans', sans-serif;
  size: 21x;
  padding: 10px;
  border-bottom: solid #eee 0.4px;
`;

export const List = styled.div`
  font-family: 'Open Sans', sans-serif;
  size: 15px;
  padding: 10px;
  border-bottom: solid #eee 0.4px;
`;


export const StatusTitle = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-left: 9px;
  margin-bottom: 5px;
  margin-top: 20px;
`

export const PageTitle = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Header = styled.div`
  padding-top: 35px;
  font-family: 'Permanent Marker', cursive;
  font-size: 40px;
  padding-left: 8px;
  padding-bottom: 15px;
  margin-bottom: 20px;

`;

export const Name = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  padding-top: 15px;
  padding-bottom: 10px;
  margin-left: 4.5px;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const T = styled.div`
  line-height: 6px;
  margin-bottom: 8px;
`
export const InfoTag = styled.p`
 font-family: 'Open Sans', sans-serif;
 font-weight: 600;
`
export const Info = styled.p`
  display: flex;
  flex-direction: column;
  line-height: 90%;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  margin-left: 4.5px;
`;

export const Description = styled.div`
  width: 290px;
  line-height: 16px;
  word-wrap: break-word;
`

export const Icon = styled.img`
  width: 15px;
  float: right;
`;

export const Rotate = styled.div`
  transform: rotate(90deg);
  height: 360px;

`;


export const ToggledProtest = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
`;

export const Wrapper = styled.div`
  padding-bottom: 50px;
  justify-content: center;
  flex: 1;
`;

export const DashboardWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 81vw;
`;

export const FindProtestWrapper = DashboardWrapper.extend`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 81vw;
`;

export const FormWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 35px;
`
export const Form = styled.form`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
`;

export const InputInfo = styled.div`
  flex-flow: column wrap;
  justify-content: center;
`;
export const Input = styled.input`
  font-size: 14px;
  height: 40px;
  width: 297px;
  padding-left: 10px;
  margin-bottom: 15px;
  margin-top: 7px;
  border: 0.2px solid #eee;
  padding: 7px;
  border-radius: 2.5px;
`;

export const SearchIcon = styled.i`
  height: 40px;
  border: 0.2px solid #eee;
  border-radius: 2.5px;
  border-left: none;
  padding-top: 12px;
  padding-right: 8px;

`;

export const Label = styled.label`
  border: 0.2px solid #eee;
  padding: 7px;
  border-radius: 4px;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  font-weight: normal;
`;

export const Text = styled.textarea`
 font-size: 14px;
  height: 80px;
  width: 297px;
  padding-left: 10px;
  margin-bottom: 15px;
  margin-top: 7px;
  margin-right: 15px;
  border: 0.2px solid #eee;
  padding: 7px;
  border-radius: 4px;
`;

export const Search = styled.input`
  font-family: 'Open Sans', sans-serif;
  color: tomato;
  font-size: 11px;
  border: 0.8px solid tomato;
  height: 29px;
  border-radius: 3px;
  background-color: white;
  margin-bottom: 15px;
`;
export const Submit = Search.extend`
  width: 115px;
`;

export const CancelEvent = Submit.extend`
  background-color: tomato;
  color: white;
`;

export const Load = styled.div`
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  vertical-align: middle;
  height: 40px;
  padding-top: 10px;
  margin-bottom: 10px;
  font-size: 13px;
  color: tomato;
  border: 1px solid tomato;
`;

export const TextInput = styled.input`
  width:315px;
  height: 40px;
  background-color:#F7F7F7;
  border:none;
  padding: 10px;

`;

export const cameraIcon = styled.div`
  height: 40px;
  background-color:#F7F7F7;
  border: none;
`
export const DayOfTitle = styled.div`
  font-family: 'Open Sans', sans-serif;
  display:flex;
  justify-content:center;
  margin-bottom:20px;
  margin-top: 20px;
  font-size:6vh;
  height: 7vh;
  top:0px;
`;

export const DayOfContentWrapper = styled.div`
  height: 82vh;
  width: 100vw;
  margin: auto;
`;

export const Group = styled.div`
  font-family: 'Open Sans', sans-serif;
  line-height: 20px;
  margin-bottom: 20px;
`

export const CredCount = styled.div`
  text-align: center;
  color: #9B9B9B;
`;

export const PinWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PinContent = styled.div`
  flex-direction: row;
  flex: 8;
  padding-top: 11px;
  padding-left: 10px;
`;

export const ItemUserName = styled.div`
  color: #4A4A4A;
  font-weight: 600;
`;

export const TimeStamp = styled.div`
  color: #C5C5C5;
  fontSize: '.8em';
`;

export const TimeImage = styled.img`
  width: 1em;
  marginRight: 5px;
`;
export const FeedWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 70px;
`;

export const TwitterWrapper = styled.div`
  display: block;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 70px;
`
export const Bird = styled.i`
  color: tomato;
  margin-right: 5px;
`;

export const Item = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 12.5px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  border: 1px solid #eee;
  margin-top: 9px;
  border-right: none;
  border-left: none;
  border-top: none;
  > :last-child {
    border-bottom: none;
  }
`;

export const Twit = Item.extend`
  font-size: 12.5px;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

export const TwitDate = styled.div`
  color: #bdb6b6;
`



export const VoteImage = styled.img`
  width: 100%;
`;

export const VoteHolder = styled.div`
  flex:1;
  width: 3em;
  padding-left: 5px;
  text-align: center;
`;

export const PinVoteHolder = styled.div`
  flex:1;
  width: 4em;
  text-align: center;
`;

export const VoteUp = styled.i`
  color: hsla(120, 90%, 42%, 0.93);
  width: 30%;
`;

export const VoteDown = styled.i`
  color: rgba(245, 97, 35, 0.94);
  width: 30%;
`;

export const 
PinVoteUp = styled.i`
  color: hsla(120, 90%, 42%, 0.93);
  size: 100%;
`;

export const PinVoteDown = styled.i`
  color: rgba(245, 97, 35, 0.94);
  size: 100%;
`;

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  bottom: 0;
  padding-bottom: 0.5px;
  width: 100%;
  height: 30px;
  position: fixed;
  z-index: 1000;
`;

export const Tab = styled.div`
  flex: 1 0 auto;
	padding: 1.25em 2em;
  background-color:white;
	border: 1px solid black;
  height: 100%;
  background-color: none;
  border-left: none;
  border-bottom: none;
  text-align: center;
  bottom:auto;
  top:auto;
  &:hover {
    background-color: tomato;
  }
`;

export const ErrorMsg = styled.div`
  color: red;
  font-size: 80%;
  margin-bottom: 5px;
`;

export const PinTextInput = styled.textarea`
  width: 60vw;
  margin-right: 2vw;
`;

export const PinSubmit = styled.input`
  padding:5px 15px;
  background:#ccc;
  border:0 none;
  cursor:pointer;
  border-radius: 5px;
`;

export const DayOfProtestInfo = styled.div`
  font-family: 'Open Sans', sans-serif;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  margin-top: 30px;
`;

export const DayOfInfoCategory = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
`;

export const Photo = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;
