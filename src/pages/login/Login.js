import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { userLogin, } from '@/redux/actions/user';

class Login extends Component {

  state = {
    name: null,
  }

  handleLogin = () => {
    const { name } = this.state;
    this.props.userLogin(name);
  }

  onChangeText = (name) => {
    this.setState({ name })
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="请求输入"
          placeholderTextColor="#000"
          underlineColorAndroid="transparent"
          style={styles.input}
          onChangeText={this.onChangeText} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.handleLogin}
          style={styles.button_login}>
          <Text style={styles.txt_login}>登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = {
  userLogin,
};

const mapStateToProps = (state) => ({
  pending: state.user.pending,
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_login: {
    margin: 20,
    width: 240,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  txt_login: {
    fontSize: 14,
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    width: 260,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 8,
  }
});