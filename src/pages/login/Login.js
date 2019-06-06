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
          placeholder="请输入信息"
          placeholderTextColor="#8A8A99"
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
    backgroundColor: '#222231',
   
  },
  txt_login: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    width: 240,
    fontSize: 14,
    color: "#222231",
    borderBottomColor: '#E1E2E6',
    borderBottomWidth: 1,
    marginBottom: 20,
  }
});