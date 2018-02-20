// @flow

import React, { Component } from 'react';
import { ART, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Page } from 'mobileapp/src/components';

import createLineGraph from 'mobileapp/src/graph-utilities/CreateLineGraph';

import styles from './Home.style';

const {
  Group,
  Surface,
  Shape,
} = ART;

const repeater = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  props: PropsType;

  componentWillMount() {
    var ws = new WebSocket("ws://localhost:3000/websocket");
    ws.onopen = function()
    {
      // Web Socket is connected, send data using send()
      ws.send("ping");
    };

    ws.onmessage = (evt) =>
    {
      if(evt.data) {
        this.props.appendData(evt.data);
        setTimeout(function(){ws.send("ping");}, 10);
      }
    };

    ws.onclose = function()
    {
      console.error("Connection closed.")
    };
  }


  render() {
    const displayGraph = this.props.graphData.length > 0;
    let dAttr
    if (displayGraph) {
      dAttr = createLineGraph({
        data: this.props.graphData,
        xAccessor: d => d[0],
        yAccessor: d => d[1],
        width: 500,
        height: 100,
      });
    }
    return (
      <Page noMargin>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            This is the Home page
          </Text>
          {displayGraph && repeater.map( index => (
            <View>
              <Surface width={Dimensions.get('window').width} height={100}>
                <Group x={0} y={0}>
                  <Shape
                    d={dAttr.path}
                    stroke="#000"
                    strokeWidth={0.5}
                  />
                </Group>
              </Surface>
            </View>)
          )}
        </ScrollView>
      </Page>
    );
  }
}

type PropsType = {
  appendData: any,
  navigation: any,
};
