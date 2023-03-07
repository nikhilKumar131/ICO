
import styles from '@/styles/Home.module.css';
import { useRef, useState, useEffect } from 'react';
import web3modal from "web3modal";
import { ethers } from 'ethers';
import { address, ABI } from '@/contracts/smc';
import Footer from '@/components/footer';


export default function Home() {

  const [tokenBalance, setTokenBalance] = useState(0);
  let web3modalRef = useRef();
  const [walletStatus, setWalletStatus] = useState(false);

  async function getProviderOrSigner(signer = false) {
    try {
      const provider = await web3modalRef.current.connect()
      const providers = new ethers.providers.Web3Provider(provider)

      if (signer) {
        const signer = providers.getSigner();
        return signer;
      }

      return providers;
    }
    catch {
      (err) => { console.error(err) }
    }

  }

  useEffect(() => {
    if (walletStatus == false) {
      web3modalRef.current = new web3modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      getProviderOrSigner()
      setWalletStatus(true)
    }
    try { balance() } catch { err => { console.error(err) } }

  }, [walletStatus])

  async function mint() {
    try{
      const signer = await getProviderOrSigner(true);
      const contract = new ethers.Contract(address, ABI, signer);
      const txn = await contract.mint();
      const reciept = await txn.wait();
  
      balance()
    }
    catch{err =>{ console.error(err)}}
  }

  async function balance() {try{
    const signer = await getProviderOrSigner(true);
    const contract = new ethers.Contract(address, ABI, signer);
    const addr = await signer.getAddress();
    const balanceInHex = await contract.balanceOf(addr);
    const balance = parseInt(balanceInHex)

    setTokenBalance(balance / 10 ** 18)
    console.log(balance);
    if(balance == 40*10**18){
      getAlert()
    }
  }catch {err => {console.error(err)}}}

  function getAlert() {
    alert("You have received a free NFT")
  }



  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Buy 10 NIKS tokens for 0.001 ethers here:</h1>
        <button className={styles.button} onClick={mint}>Mint</button>
        <h1>balance: <span>{tokenBalance}</span> 10^18 CRY</h1>
        <p>Get a free NFT after buying three set of Tokens</p>
      </div>
      <div className={styles.image}>
        <img src="0.svg"  />
      </div>
      <Footer />
    </div>
  )
}
