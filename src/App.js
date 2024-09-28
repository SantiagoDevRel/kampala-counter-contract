import logo from "./logo.svg";
import "./App.css";
//1. import web3
import { Web3 } from "web3";

//2. import swisstronik plugin
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";

//3. import ABI of counter contract
import ABI from "./abi.mjs";

function App() {
  //4. initialize the web3 object
  const web3 = new Web3(window.ethereum);

  //5. register swisstronik plugin
  web3.registerPlugin(new SwisstronikPlugin("https://json-rpc.testnet.swisstronik.com"));

  //6. initialize contract
  const contract = new web3.eth.Contract(ABI, "0xef05a01bd64dda4962687cbae843c6cbf5b8cc14");

  //7. call the contract
  async function returnCount() {
    console.log(await web3.eth.getChainId());

    const result = await contract.methods.returnCount().call();
    console.log("current count", result);
  }

  async function increaseCount() {
    // connect user's account
    const accounts = await web3.eth.requestAccounts();

    // call the writing function "increaseCount"
    const receipt = await contract.methods.increaseCount().send({ from: accounts[0] });
    console.log("tx receipt:", receipt);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={returnCount}>Count (reading fn)</button>
        <button onClick={increaseCount}>Increase Count (writing fn)</button>
      </header>
    </div>
  );
}

export default App;
