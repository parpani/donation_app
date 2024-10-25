import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import { Routes } from '../../navigation/Routes';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

import {loginUser} from '../../api/user';
import {useDispatch} from 'react-redux';
import { logIn } from '../../redux/reducers/User';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //console.log(email);
  const dispatch = useDispatch();
  //dispatch(resetToInitialState());

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.container}>

        <View style={globalStyle.marginBottom24}>
          <Header type={1} title={'Welcome Back'}/>
        </View>

        <View style={globalStyle.marginBottom24}>
          <Input
            keyboardType={'email-address'}
            label={'Email'}
            placeholder={'Enter your Email...'}
            onChangeText={value => setEmail(value)}
            secureTextEntry={false}
          />
        </View>

        <View style={globalStyle.marginBottom24}>
          <Input
            label={'Password'}
            placeholder={'******'}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}
          />
        </View>
        
        {error.length > 0 && <Text style={style.error}>{error}</Text>}
        <View style={globalStyle.marginBottom24}>
          <Button
            onPress={async () => {
              let user = await loginUser(email, password);
              if (!user.status) {
                setError(user.error);
              } else {
                setError('');
                //console.log("User2", user.data);
                const response = dispatch(logIn(user.data));
                //console.log("In Login", response)
                navigation.navigate(Routes.Home);
              }
            }}
            title={'Login'}
            isDisabled={email.length < 5 || password.length < 8}
          />
        </View>

        <Pressable style={style.registrationButton} onPress={()=>navigation.navigate(Routes.Registration)}>
          <Header color={'#156CF7'} type={3} title={"Don't have an account?"}></Header>
        </Pressable>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;