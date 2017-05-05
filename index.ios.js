/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    NativeAppEventEmitter,//导入
} from 'react-native';

//在JavaScript中调用Object-C定义的方法，需要先导入NativeModules,再使用RNCalliOSFuncation
var RNCalliOSAction = NativeModules.RNCalliOSAction;


export default class RNAndiOSCallEachOther extends Component {

    constructor(props){
        super(props);

        this.state={
            callBackData:'',
            PromisesData:'',
            selectDate:'',
        }

        this.PromisesCallBack = this.PromisesCallBack.bind(this);
    }

    componentDidMount (){
        this.listener=NativeAppEventEmitter.addListener('getSelectDate',(data)=>{

            this.setState({
                selectDate:data.SelectDate,
            })
        })

    }
    componentWillUnmount(){
        this.listener.remove();
    }

    //Promises 回调  异步执行方法
    async PromisesCallBack(){
        console.log('PromisesCallBack');

        //try catch确保程序正确执行
        try {
            console.log('RNCalliOSAction'+RNCalliOSAction);

            //await  是等待获取回调值以后在进行下一步的操作
            var events=await RNCalliOSAction.calliOSActionWithResolve();

            this.setState({
                PromisesData: events,
            });

            console.log('Promises回调：'+events);
        }catch (error){
            console.log('Promises回调error：'+error);

        }

    }


  render() {
    return (
      <View style={styles.container}>

          <TouchableOpacity style={{height:30}}
                            onPress={()=>{
                RNCalliOSAction.calliOSActionWithOneParams('hello');
            }}>
              <Text>点击调用iOS原生方法,RN向iOS传递一个参数</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{height:30}}
                            onPress={()=>{
                RNCalliOSAction.calliOSActionWithSecondParams('hello','iOS');
            }}>
              <Text>点击调用iOS原生方法,RN向iOS传递两个参数</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:30}}
                            onPress={()=>{
                RNCalliOSAction.calliOSActionWithDictionParams({
                    params1:'RN',
                    params2:'call',
                    params3:'iOS'
                });
            }}>
              <Text>点击调用iOS原生方法,传递一个json数据</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:30}}
                            onPress={()=>{
                RNCalliOSAction.calliOSActionWithArrayParams([
                    'RN',
                    'call',
                    'iOS'
                ]);
            }}>
              <Text>点击调用iOS原生方法,传递一个数组</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:30}}
                            onPress={()=>{
                RNCalliOSAction.calliOSActionWithActionSheet();
            }}>
              <Text>点击调用iOS原生方法,弹出ActionSheet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:60,marginTop:30}}
                            onPress={()=>{
                                //此处的(string,array)参数列表要和回调时传的参数列表要一致。位置一样才可以获取正确的数据
                RNCalliOSAction.calliOSActionWithCallBack((string,array,end)=>{
                    console.log(string);
                    console.log(array);
                    console.log(end);
                    let data=string+'  '+array[0]+'  '+array[1]+'  '+array[2]+'  '+end;

                    this.setState({
                        callBackData:data,
                    })

                });
            }}>
              <Text>点击调用iOS原生方法,并得到回调</Text>
              <Text>回调结果callBack：{this.state.callBackData}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:60}}
                            onPress={()=>{
                                this.PromisesCallBack();
            }}>
              <Text>点击调用iOS原生方法,Promises 回调</Text>
              <Text>回调结果Promises：{this.state.PromisesData}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:60}}
                            onPress={()=>{

                                RNCalliOSAction.RNCalliOSToShowDatePicker();
            }}>
              <Text>点击调用iOS原生方法,弹出时间选取器</Text>
              <Text>选取的时间：{this.state.selectDate}</Text>
          </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNAndiOSCallEachOther', () => RNAndiOSCallEachOther);
