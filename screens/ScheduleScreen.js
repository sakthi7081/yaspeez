import React from 'react';
import { Layout, Text, List, Divider, ListItem } from '@ui-kitten/components';
import { Alert, View } from 'react-native';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import { getUserEvents } from '../utils/api';

export default class ScheduleScreen extends React.Component {
  state = {dateSelected: new Date(), scheduledDates: [], events: [], markedDates: []};

  async componentDidMount() {
    await getUserEvents(8)
      .then(({value}) => {
        let scheduledDates = [];
        let markedDates = [];
        value.map(({ScheduleDate, EventName, IsCancelled, yEventSchedule_ID, StartTime, EndTime}) => {
          let df = moment(ScheduleDate).format('DDMMYYYY');
          let dj = {EventName, IsCancelled, yEventSchedule_ID, StartTime, EndTime};
          markedDates.push({date: moment(df, 'DDMMYYYY'), dots: [{color: 'red'}]});
          scheduledDates[df] = scheduledDates[df] ? [...scheduledDates[df], dj] : [dj];
        });
        let df = moment().format('DDMMYYYY');
        const events = scheduledDates[df] ? scheduledDates[df] : [];
        this.setState({scheduledDates, events, markedDates});
      })
      .catch(e => Alert.alert('Error', e.message));
  }

  handleDateSelected = dateSelected => {
    const {scheduledDates} = this.state;
    let df = moment(dateSelected).format('DDMMYYYY');
    const events = scheduledDates[df] ? scheduledDates[df] : [];
    this.setState({dateSelected, events});
  }

  accessoryRight = time => {
    const {dateSelected} = this.state;
    const date = moment(dateSelected).format('DDMMYYYY');
    return (<View style={{borderWidth: 1, borderColor: '#888', paddingHorizontal: 5, paddingVertical: 6, borderRadius: 50}}>
      <Text style={{color: '#888', fontSize: 12}}>{moment(`${date} ${time.totalHours}`, 'DDMMYYYY HH.mm').format('hh:mm a')}</Text>
    </View>);
  }

  renderItem = ({item, index})  => {
    const {dateSelected} = this.state;
    const date = moment(dateSelected).format('DDMMYYYY');
    return (<ListItem key={`event-${index}`}
              title={<Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>{item.EventName}</Text>}
              description={<Text style={{fontSize: 14, color: '#777'}}>{`Ends at ${moment(`${date} ${item.EndTime.totalHours}`, 'DDMMYYYY HH.mm').format('hh:mm a')}`}</Text>}
              accessoryRight={() => this.accessoryRight(item.StartTime)} />);
  }

  render() {
    const {dateSelected, events, markedDates} = this.state;

    return (
      <Layout style={{justifyContent: 'space-between'}}>
        <CalendarStrip
          scrollable
          style={{height:110, paddingVertical: 10}}
          calendarHeaderStyle={{color: '#fff', fontWeight: 'bold', fontSize: 18}}
          markedDatesStyle={{position: 'absolute', left: 8}}
          calendarColor={'#0d4ae8'}
          dateNumberStyle={{color: '#ffffff90'}}
          dateNameStyle={{color: '#ffffff90'}}
          shouldAllowFontScaling={true}
          useIsoWeekday={true}
          minDate={new Date()}
          selectedDate={dateSelected}
          onDateSelected={this.handleDateSelected}
          markedDates={markedDates}
          iconContainer={{display: 'none'}}
          highlightDateNameStyle={{color: '#fff', fontWeight: 'bold', fontSize: 10}}
          highlightDateNumberStyle={{color: '#fff', fontWeight: 'bold', fontSize: 30}}
        />
        <Layout style={{backgroundColor: '#fff'}}>
          <List data={events} ItemSeparatorComponent={Divider} renderItem={this.renderItem} />
          {events.length === 0 && (
            <Text style={{fontSize: 18, padding: 20, color: '#777'}}>No schedules for today!</Text>
          )}
        </Layout>
      </Layout>
    )
  }
}