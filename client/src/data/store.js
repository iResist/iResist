module.exports =
{
  events:
  {
    1: {
      organizers:
      {
        userID: 10,
        userName: 'blackSpaniel'
      },
      name: 'PUTIN POOPOO',
      description: 'down with the oligarchy and dictatorship yaya',
      cause: 'dictatorships are bad',
      attendee_count: 747474747,
      mapId: 1,
      feedId: 1,
      status: 'upcoming',
      eventStart: 1498931057000,
      eventDuration: 3600000,
      address: '944 market street, san francisco CA 99999'
    },
    2: {
      organizers:
      {
        userID: 20,
        userName: 'tabbyCat'
      },
      name: 'GOD SAVE EUGENE',
      description: 'treat eugene like the queen that she is',
      cause: 'yujin is her own sovereign',
      attendee_count: 89317948374891,
      mapId: 2,
      feedId: 2,
      status: 'upcoming',
      eventStart: 1499449457000,
      eventDuration: 3600000,
      address: '944 market street, san francisco CA 99999'
    },
    3: {
      organizers:
      {
        userID: 10,
        userName: 'blackSpaniel'
      },
      name: 'BAN KALE',
      description: 'kale is a marketing lie and is actually not even that nutritious',
      cause: 'stop bb propagated lies',
      attendee_count: 10000,
      mapId: 3,
      feedId: 3,
      status: 'ongoing',
      eventStart: 1499708657000,
      eventDuration: 3600000,
      address: '611 market street, san francisco CA 99999'
    },
      4: {
      organizers:
      {
        userID: 30,
        userName: 'asian'
      },
      name: 'Say No To HighFives',
      description: 'Highfiving fever has gone too far and must be crushed',
      cause: 'It is unnatural and unnecessary',
      attendee_count: 500000,
      mapId: 4,
      feedId: 4,
      status: 'upcoming',
      eventStart: 1499708657000,
      eventDuration: 3600000,
      address: '611 market street, san francisco CA 99999'
    },
      5: {
      organizers:
      {
        userID: 60,
        userName: 'stevenSeagall'
      },
      name: 'Meh',
      description: 'meh meh meh meh meh meh',
      cause: 'meeeeeh',
      attendee_count: 1,
      mapId: 5,
      feedId: 5,
      status: 'upcoming',
      eventStart: 1499708657000,
      eventDuration: 3600000,
      address: '611 market street, san francisco CA 99999'
    },
      6: {
      organizers:
      {
        userID: 70,
        userName: 'sneakyMustache'
      },
      name: 'Save the Planet',
      description: 'Climate change is real and few will survive the inevitable apocalypse. The few remaining Earth dwellers will...will learn how to...hm...',
      cause: 'mother earth',
      attendee_count: 365,
      mapId: 6,
      feedId: 6,
      status: 'upcoming',
      eventStart: 1499708657000,
      eventDuration: 3600000,
      address: '611 market street, san francisco CA 99999'
    },
      7: {
      organizers:
      {
        userID: 10,
        userName: 'blackSpaniel'
      },
      name: 'TEST EVENT',
      description: 'TEST DESCRIPTION',
      cause: 'TEST CAUSE',
      attendee_count: 4,
      mapId: 7,
      feedId: 7,
      status: 'upcoming',
      eventStart: 1499708657000,
      eventDuration: 3600000,
      address: '611 market street, san francisco CA 99999'
    }
    
  },

  user: {
    userId: 10,
    userName: 'blackSpaniel',
    events_attending: [1, 2, 6],
    events_organizing: [3, 7]
  },

  users: {
    10: {
      userName: 'blackSpaniel',
      userCred: 1
    },
    20: {
      userName: 'tabbyCat',
      userCred: 10
    },
    30: {
      userName: 'asian',
      userCred: 7
    },
    40: {
      userName: 'bey0nce',
      userCred: 3
    },
    50: {
      userName: 'celineDion',
      userCred: 2
    },
    60: {
      userName: 'stevenSeagall',
      userCred: 0
    },
    70: {
      userName: 'sneakyMustache',
      userCred: 5
    }
  },

  maps: {
    1: {
      lat: 37.783697,
      long: -122.408966,
      eventId: 1,
      pins: [1]
    },
    2: {
      lat: 37.783697,
      long: -122.408966,
      eventId: 2,
      pins: [2, 3]
    },
    3: {
      lat: 37.789063,
      long: -122.401697,
      eventId: 3,
      pins: [4, 5, 6, 7]
    },
    4: {
      lat: 37.789063,
      long: -122.401697,
      eventId: 3,
      pins: [4, 5, 6, 7]
    },
    5: {
      lat: 37.789063,
      long: -122.401697,
      eventId: 3,
      pins: [4, 5, 6, 7]
    },
    6: {
      lat: 37.789063,
      long: -122.401697,
      eventId: 3,
      pins: [4, 5, 6, 7]
    },
    7: {
      lat: 37.789063,
      long: -122.401697,
      eventId: 3,
      pins: [4, 5, 6, 7]
    }
  },

  feed: {
    1: {
      feed_items: [1]
    },
    2: {
      feed_items: [2, 3, 4]
    },
    3: {
      feed_items: [5, 6]
    }
  },
  pins: {
    1: {
      userId: 10,
      pin_cred: 1,
      pin_type: 'string',
      pin_text: 'string',
      lat: 51.505,
      long: -0.09
    },
    2: {
      userId: 20,
      pin_cred: 10,
      pin_type: 'string',
      pin_text: 'string',
      lat: 51.505,
      long: -0.09
    },
    3: {
      userId: 40,
      pin_cred: 4,
      pin_type: 'string',
      pin_text: 'string',
      lat: 51.505,
      long: -0.09
    },
    4: {
      userId: 60,
      pin_cred: 0,
      pin_type: 'string',
      pin_text: 'string',
      lat: 51.505,
      long: -0.09
    },
    5: {
      userId: 30,
      pin_cred: 4,
      pin_type: 'string',
      pin_text: 'string',
      lat: 51.505,
      long: -0.09
    },
    6: {
      userId: 70,
      pin_cred: 5,
      pin_type: 'string',
      pin_text: 'string',
      lat: 51.505,
      long: -0.09
    },
    7: {
      userId: 20,
      pin_cred: 8,
      pin_type: 'string',
      pin_text: 'string',
      lat: 51.505,
      long: -0.09
    }
  },

  feedItems: {
    1: {
      userId: 10,
      item_text: 'look at mee',
      item_url: 'some url',
      item_created_at: '2017/03/25',
      item_cred: 8
    },
    2: {
      userId: 40,
      item_text: 'burning state',
      item_url: 'some url',
      item_created_at: '2017/10/01',
      item_cred: 2
    },
    3: {
      userId: 30,
      item_text: 'selfiee!',
      item_url: 'some url',
      item_created_at: '2017/10/01',
      item_cred: 6
    },
    4: {
      userId: 50,
      item_text: 'whee whee oui oui!',
      item_url: 'some url',
      item_created_at: '2017/10/01',
      item_cred: 3
    },
    5: {
      userId: 20,
      item_text: 'so many people',
      item_url: 'some url',
      item_created_at: '2017/12/12',
      item_cred: 9
    },
    6: {
      userId: 10,
      item_text: 'me bored at the protest',
      item_url: 'some url',
      item_created_at: '2017/12/12',
      item_cred: 2
    }
  }
};
