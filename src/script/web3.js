import Caver from 'caver-js';
import contractFile from '../contracts/Test.json';



async function testFunction() {
    //TODO 스마트 컨트렉트 호출하기

    let caver = new Caver('https://api.baobab.klaytn.net:8651/') //클레이튼 노드 주소
    let contractAddress = "0x1C87994143fAFa02ed101B49a3557c7B9C285D0C"; //스마트 컨트렉트 주소

    const accountAddress = '0xdd70DF04e05606a9DacF4D8CdE4F5Cf0cfe649A1'; //지갑 주소
    const accountPrivatekey = '0x2612ecddb6e43526b909feaedcdb28ec62d81234fc4f2fd90073697522dfff7b'; //지갑 개인키
    const deployerKeyring = caver.wallet.keyring.create(accountAddress, accountPrivatekey); //키링 생성

    caver.wallet.add(deployerKeyring); //지갑 셋팅

    const contractInstance = caver.contract.create(contractFile.abi, contractAddress); //컨트렉트 매니저 객체 생성

    console.log(contractInstance);
    console.log(contractInstance.options.address);

    //스마트 컨트렉트 호출                             호출 하고 싶은 메서드
    const result = await contractInstance.methods.getName().call();

    console.log(result);                                     //메소드에 파라메터를 담아 던짐
    const callResult2 = await contractInstance.methods.setName("testt113").call(); //파라메터를 잘 받고 호출도 잘되지만 트랜잭션 비용(가스)을 지불하지 않았기때문에 데이터 수정은 안일어남
    console.log("트랜잭션 가스를 지불하지 않은 수정 메소드  : " + callResult2);
    const callResult3 = await contractInstance.methods.setName("testt113").send({from: deployerKeyring.address,gas: 4000000});
    console.log("최초 호출 값 : " + result);
    console.log("트랜잭션 비용을 지불해서 수정 호출");
    console.log("변경 후 호출 값 : " + await contractInstance.methods.getName().call());


    // //TODO 클레이 전송
    //
    // // let caver = new Caver('https://api.baobab.klaytn.net:8651/') //클레이튼 노드 주소
    // const accountAddress = '0xdd70DF04e05606a9DacF4D8CdE4F5Cf0cfe649A1'; //지갑 주소
    // const accountPrivatekey = '0x2612ecddb6e43526b909feaedcdb28ec62d81234fc4f2fd90073697522dfff7b'; //지갑 개인키
    //
    // const keyring = new caver.wallet.keyring.singleKeyring(accountAddress, accountPrivatekey);
    //
    // console.log(keyring);
    //
    // caver.wallet.add(keyring); //지갑에 키링 셋팅
    //
    //
    // const transaction = caver.transaction.valueTransfer.create({
    //     from: keyring.address,
    //     to: '0xd8f8f9B5158251dAE7b90593b15c762d8ef9F9C3',
    //     value: 300000000000000,
    //     gas: 30000,
    // })
    // const signed = await caver.wallet.sign(keyring.address, transaction);
    // const receipt = await caver.rpc.klay.sendRawTransaction(signed);
    // console.log(receipt);
    //
    //
    // //TODO 스마트 컨트랙트 배포하기

    // const caver = new Caver('https://api.baobab.klaytn.net:8651/');
    //
    // const byteCode = contractFile.bytecode;
    // const abi = contractFile.abi;
    // const accountAddress = '0xdd70DF04e05606a9DacF4D8CdE4F5Cf0cfe649A1'; //지갑 주소
    // const accountPrivatekey = '0x2612ecddb6e43526b909feaedcdb28ec62d81234fc4f2fd90073697522dfff7b'; //지갑 개인키
    // const deployerKeyring = caver.wallet.keyring.create(accountAddress, accountPrivatekey)
    //
    // caver.wallet.add(deployerKeyring)
    //
    // let contract = caver.contract.create(abi)
    // contract = await contract.deploy(
    //     {
    //         from: deployerKeyring.address,
    //         gas: 4000000,
    //     },
    //     byteCode,
    //     'magicKey',// 생성자 요소       만약에 생성자가 설정이 없는 상태에서 생성자를 요소를 지정해도 오류는 안남
    //     'magicValue'
    // )
    // const callResult = await contract.methods.getName().call();
    // console.log("최초 호출 값:" + callResult);
    // const callResult2 = await contract.methods.setName("testt113").send({from: deployerKeyring.address,gas: 4000000});
    // console.log("이후 호출 값:" + await contract.methods.getName().call());

}

document.addEventListener("DOMContentLoaded", function () {
    testFunction();
});


//스마트 컨트렉트 코드


//// SPDX-License-Identifier: GPL-3.0
//
// pragma solidity >=0.7.0 <0.9.0;
//
// /**
//  * @title Storage
//  * @dev Store & retrieve value in a variable
//  */
// contract Storage {
//
//     uint256 number;
//     string name ="test";
//
//     /**
//      * @dev Store value in variable
//      * @param num value to store
//      */
//     function store(uint256 num) public {
//         number = num;
//     }
//
//      function getName() public view returns(string memory) {
//         return name;
//     }
//
//     function setName(string memory _str) public returns(string memory) {
//         name = _str;
//         return name;
//     }
//
//
//     /**
//      * @dev Return value
//      * @return value of 'number'
//      */
//     function retrieve() public view returns (uint256){
//         return number;
//     }
// }