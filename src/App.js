import { Component,useState } from 'react';
import './App.css';


import OnePage from './components/One/one';
import TwoPage from './components/Two/two';

import ModalLock from './components/ModalLock/modallock';
import ModalWithdraw from './components/ModalWithdraw/modalwithdraw';

import ModalPDeposit from './components/ModalPDeposit/modalpdeposit';
import ModalPWithdraw from './components/ModalPWithdraw/modalpwithdraw';

import Logo from './assets/Logo.png';
import Avatar from './assets/avatar.png';
import Wallet from './assets/wallet.png';

import {Modal,Tabs,Image} from 'antd';

const Web3 = require('web3');
const {TabPane} = Tabs;

class App extends Component {

  state = { loading: false,storageValue: 0, accounts: null, contract: null,
  showmodalc:false,showmodalp:false };

  handleCancel = () => {
    this.setState({
      showmodalc:false
    });
  };

  handleCancelP = () => {
    this.setState({
      showmodalp:false
    });
  };

  showModalC=()=>{
    this.setState({
      showmodalc:true
    });
    console.log(this.state.showmodalc);
  };

  
  showModalP=()=>{
    this.setState({
      showmodalp:true
    });
  };

  connectWallet= async()=>{
    console.log("connect web3");
    // if (typeof window.ethereum !== 'undefined') {
    //   console.log('MetaMask is installed!');
    // }else{
    //   window.alert('Please install MetaMask first.');
    //   return;
    // }

    // //链接metamask钱包
    // window.ethereum.request({ method: 'eth_requestAccounts' });
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // const account = accounts[0];
    // console.log(account);

    // if(typeof web3!=='undefined'){
    //   web3=new Web3(web3.currentProvider);
    //   console.log("web3");
    // }else{
    //   web3 = new Web3(new Web3.providers.HttpProvider("https://testnet.aurora.dev"));
    //   console.log("web3 providers");
    // }

    this.setState({ loading: true });//到这里metamask就连接上了，状态为true
  };

  OperationsSlot= {
    left:<Image preview={false} className="lc"
    src={Logo}
    />,
    right:<div className="rc">
      <Image className="avatar" preview={false} src={Avatar} width={30} height={30}></Image>
      <Image className="wallet" onClick={this.connectWallet} preview={false} src={Wallet} width={30} height={30}></Image>
      </div>
  };

  render(){
    return (
      <div>
        <div className="App">
          <Tabs className="tabs" defaultActiveKey="2" tabBarExtraContent={this.OperationsSlot}>
            <TabPane className="tabs_c" tab="流动性" key="1">
              <OnePage SetShowModalC={this.showModalC} SetShowModalP={this.showModalP} />
            </TabPane>
            <TabPane className="tabs_c" tab="借贷+稳定币" key="2">
              <TwoPage />
            </TabPane>
          </Tabs>
        </div>
        {/* Lock Modal */}
        <Modal
          className='modal_c'
          visible={this.state.showmodalc}
          title="Lock And Vote"
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <Tabs className='modalctabnav' defaultActiveKey="1" centered>
              <TabPane tab="LOCK" key="1">
                <ModalLock />
              </TabPane>
              <TabPane tab="WITHDRAW" key="2">
                <ModalWithdraw />
              </TabPane>
            </Tabs>
          </div>
        </Modal>

        {/* Provide Modal */}
        <Modal
          className='modal_p'
          visible={this.state.showmodalp}
          title="Provide Liquidity"
          onCancel={this.handleCancelP}
          footer={[]}
        >
          <div>
            <Tabs className='modalptabnav' defaultActiveKey="1" centered>
              <TabPane tab="DEPOSIT" key="1">
                <ModalPDeposit />
              </TabPane>
              <TabPane tab="WITHDRAW" key="2">
                <ModalPWithdraw />
              </TabPane>
            </Tabs>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
