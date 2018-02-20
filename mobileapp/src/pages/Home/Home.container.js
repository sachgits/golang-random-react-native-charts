// @flow

import { connect } from 'react-redux';
import Home from './Home.component';

const mapStateToProps = state => ({
  graphData: state.graph,
});

const mapDispatchToProps = dispatch => ({
  appendData: value => dispatch({
    type: "APPEND_DATA",
    value
  })
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
