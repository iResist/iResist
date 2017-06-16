import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { DayOfContentWrapper, DayOfTitle, DayOfInfoCategory, DayOfProtestInfo, Group } from './StyledComponents.jsx';
import { Textfit } from 'react-textfit';

const DayOfInfo = (props) => {
  return (
    <DayOfContentWrapper>
      <DayOfTitle><Textfit>{props.event.name}</Textfit></DayOfTitle>
      <DayOfProtestInfo>
        <Group>
          <DayOfInfoCategory>Issue</DayOfInfoCategory>
            <div>{props.event.cause}</div>
        </Group>
        <Group>
          <DayOfInfoCategory>Meeting Place</DayOfInfoCategory>
            <div>{props.event.address}</div>
        </Group>
        <Group>
          <DayOfInfoCategory>When</DayOfInfoCategory>
            <div>{moment(Number(props.event.time)).format('MMMM DD, YYYY h:mm a')} - {moment(Number(props.event.time) + Number(props.event.duration)).format('h:mm a')}</div>
        </Group>
        <Group>
          <DayOfInfoCategory>RSVP'd</DayOfInfoCategory>
            <div>{props.event.attendee_count}</div>
        </Group>
        <Group>
          <DayOfInfoCategory>Description</DayOfInfoCategory>
            <div>{props.event.description}</div>
        </Group>
      </DayOfProtestInfo>
    </DayOfContentWrapper>
  );
};

export default DayOfInfo;
