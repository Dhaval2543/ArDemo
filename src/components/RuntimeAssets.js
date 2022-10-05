import axios from 'axios';
import {Buffer} from 'buffer';
import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModelView from 'react-native-gl-model-view';

const AnimatedModelView = Animated.createAnimatedComponent(ModelView);

// XXX: This is the standard content header returned for a blob.
const octetStreamHeader = 'data:application/octet-stream;base64,';

class RuntimeAssets extends React.Component {
  state = {
    model: null,
    texture: null,
    error: null,
    loading: false,
  };

  constructor() {
    super();
    this.state = {
      rotateX: new Animated.Value(-90),
      rotateZ: new Animated.Value(0),

      fromXY: undefined,
      valueXY: undefined,
      model: null,
      texture: null,
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchDemonFromNetwork();
  }

  onMoveEnd = () => {
    this.setState({
      fromXY: undefined,
    });
  };

  onMove = e => {
    let {pageX, pageY} = e.nativeEvent,
      {rotateX, rotateZ, fromXY, valueXY} = this.state;
    if (!this.state.fromXY) {
      this.setState({
        fromXY: [pageX, pageY],
        valueXY: [rotateZ.__getValue(), rotateX.__getValue()],
      });
    } else {
      rotateZ.setValue(valueXY[0] + (pageX - fromXY[0]) / 2);
      rotateX.setValue(valueXY[1] + (pageY - fromXY[1]) / 2);
    }
  };

  getContentFromUrl(url, decode = false) {
    return axios({
      method: 'get',
      url,
      responseType: 'blob',
    }).then(
      res =>
        new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onloadend = () =>
            resolve(
              decode
                ? new Buffer(fileReader.result, 'base64')
                : fileReader.result,
            );
          fileReader.onerror = reject;
          fileReader.readAsDataURL(res.data);
        }),
    );
  }

  // XXX: The underlying application needs to know the file type of the model.
  //      Therefore, we must change the header returned by axios to something
  //      more indicative of the type.
  formatContent(uri, header) {
    return `${header}${uri.substring(octetStreamHeader.length)}`;
  }

  fetchDemonFromNetwork = () => {
    this.setState({
      loading: true,
      error: null,
    });
    return Promise.all([
      this.getContentFromUrl(
        'https://github.com/rastapasta/react-native-gl-model-view/raw/master/example/data/demon.model',
      ).then(content =>
        this.formatContent(content, 'data:geometry/model;base64,'),
      ),
      this.getContentFromUrl(
        'https://github.com/rastapasta/react-native-gl-model-view/raw/master/example/data/demon.png',
      ),
    ])
      .then(binaries => {
        const model = binaries[0];
        const texture = binaries[1];
        this.setState({
          model,
          texture,
          loading: false,
          error: null,
        });
      })
      .catch(e =>
        this.setState({
          loading: false,
          error: e || new Error('Something unexpected has happened.'),
        }),
      );
  };

  renderModel(nextProps, nextState) {
    const {model, texture, rotateZ, rotateX, fromXY} = nextState;

    const textureSrc = {
      uri: texture,
    };
    const modelSrc = {
      uri: model,
    };
    return (
      // <ModelView
      //   style={{flex: 1}}
      //   model={modelSrc}
      //   texture={textureSrc}
      //   scale={0.01}
      //   translateZ={-2.5}
      //   rotateX={270}
      //   rotateY={0}
      //   rotateZ={0}
      //   animate
      // />
      <AnimatedModelView
        model={modelSrc}
        texture={textureSrc}
        onStartShouldSetResponder={() => true}
        onResponderRelease={this.onMoveEnd}
        onResponderMove={this.onMove}
        animate={!!fromXY}
        tint={{r: 1.0, g: 1.0, b: 1.0, a: 1.0}}
        scale={Platform.OS === 'android' ? 0.01 : 0.015}
        rotateX={rotateX}
        rotateZ={rotateZ}
        translateZ={-4}
        style={styles.modelContainer}
      />
    );
  }
  renderControls(nextProps, nextState) {
    const {error, loading} = nextState;
    return (
      <View style={styles.controls}>
        {!!loading && <ActivityIndicator />}
        {!loading && (
          <TouchableOpacity
            style={styles.controlBox}
            disabled={loading}
            onPress={this.fetchDemonFromNetwork}>
            <Text style={error ? styles.controlTextError : styles.controlText}>
              {error ? 'Retry' : 'Load'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  render() {
    const {model, texture} = this.state;
    return (
      <View style={styles.container}>
        {model && texture
          ? this.renderModel(this.props, this.state)
          : this.renderControls(this.props, this.state)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modelContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  controls: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  controlTextError: {
    color: 'red',
    fontSize: 30,
  },
  controlText: {
    color: 'black',
    fontSize: 30,
  },
});

export default RuntimeAssets;
