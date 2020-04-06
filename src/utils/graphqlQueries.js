import gql from 'graphql-tag';

// Used for query information of user who signed in
// Can get back all User field - However, if you don't any field, you should not mention it
export const ME = gql`
  query {
    me {
      id
      email
      role
      phone
      firstName
      lastName
      avatar
    }
  }
`;

export const USERS = gql`
  query Users($cursor: String, $limit: Int) {
    users(cursor: $cursor, limit: $limit) {
      data {
        id
        employeeId
        email
        role
        phone
        firstName
        lastName
        avatar
        createdAt
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

export const DEVICES = gql`
  query Devices($cursor: String, $limit: Int) {
    devices(cursor: $cursor, limit: $limit) {
      data {
        id
        title
        model
        manufacturer
        origin
        manufacturedYear
        startUseTime
        startUseState
        originalPrice
        faculty
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

export const ACTIVE_EVENTS = gql`
  query ActiveEvents($cursor: String, $limit: Int) {
    activeEvents(cursor: $cursor, limit: $limit) {
      data {
        creator {
          firstName
          lastName
          employeeId
          email
        }
        device {
          id
          title
          activeState
          faculty
        }
        reported
        actionType
        createdAt
        usedInterval
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

// Used for query information of device which has an <id> as input
// Can get back all Device field - However, if you don't any field, you should not mention it
export const DEVICE_STATE = gql`
  query Device($id: ID!) {
    device(id: $id) {
      currentState
    }
  }
`;

export const DEVICE_AVAILABILITY = gql`
  query Device($id: ID!) {
    device(id: $id) {
      id
      availability
    }
  }
`;

export const DEVICE_INFO_CONDENSE = gql`
  query Device($id: ID!) {
    device(id: $id) {
      id
      activeState
      availability
      model
      manufacturer
      title
    }
  }
`;

export const DEVICE_INFO = gql`
  query Device($id: ID!) {
    device(id: $id) {
      id
      title
      model
      manufacturer
      origin
      manufacturedYear
      startUseTime
      startUseState
      originalPrice
      currentPrice
      faculty
      availability
      activeState
    }
  }
`;

export const ACTIVE_EVENTS_BY_DEVICE = gql`
  query ActiveEventsByDevice($deviceId: ID!) {
    activeEventsByDevice(deviceId: $deviceId) {
      data {
        id
        actionType
        createdAt
        usedInterval
        creator {
          firstName
          lastName
        }
      }
    }
  }
`;

export const LASTEST_MAINTAIN_EVENT = gql`
  query LastestMaintainEvent($deviceId: ID!) {
    lastestMaintainEvent(deviceId: $deviceId) {
      id
      finished
      device {
        availability
      }
      maintainInfo {
        name
        address
        cost
        phone
        note
      }
    }
  }
`;

export const MAINTAIN_EVENTS_BY_DEVICE = gql`
  query MaintainEventsByDevice($deviceId: ID!) {
    maintainEventsByDevice(deviceId: $deviceId) {
      data {
        id
        finished
        createdAt
        maintainInterval
        creator {
          email
          lastName
          firstName
        }
        maintainInfo {
          name
          address
          cost
          phone
          note
        }
        receiver {
          firstName
          lastName
        }
      }
    }
  }
`;

export const LIQUIDATE_EVENT_BY_DEVICE = gql`
  query LiquidateEventByDevice($deviceId: ID!) {
    liquidateEventByDevice(deviceId: $deviceId) {
      data {
        id
        createdAt
        creator {
          lastName
          firstName
          email
        }
        liquidateInfo {
          name
          address
          price
          phone
          note
        }
      }
    }
  }
`;
