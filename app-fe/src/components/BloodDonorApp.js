import { useState, useEffect } from 'react';
import Web3 from 'web3';
import BloodDonorContract from '../BloodDonor.json'; // Assuming you have the ABI saved in a separate file
const BloodDonorABI = BloodDonorContract.abi;
const BloodDonorContractAddress = BloodDonorContract.networks['5777'].address; // Replace with your contract address

function BloodDonorApp() {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [weight, setWeight] = useState('');
    const [isEligible, setIsEligible] = useState(false);

    // Connect to Web3 provider when the component mounts
    useEffect(() => {
        const connectToWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                // Initialize contract instance
                const contractInstance = new web3Instance.eth.Contract(
                    BloodDonorABI,
                    BloodDonorContractAddress
                );
                setContract(contractInstance);
            } else {
                console.error('MetaMask not detected. Please install MetaMask to use this application.');
            }
        };

        connectToWeb3();
    }, []);

    const handleCheckEligibility = async () => {
        if (!web3 || !contract) return;

        try {
            const accounts = await web3.eth.requestAccounts();
            const account = accounts[0];
            const result = await contract.methods.checkEligibility().call({ from: account });
            setIsEligible(result);
        } catch (error) {
            console.error('Error checking eligibility:', error);
        }
    };

    const handleSetWeight = async () => {
        if (!web3 || !contract) return;

        try {
            const accounts = await web3.eth.requestAccounts();
            const account = accounts[0];
            await contract.methods.setWeight(weight).send({ from: account });
        } catch (error) {
            console.error('Error setting weight:', error);
        }
    };

    return (
        <div>
            <h1>Blood Donor App</h1>
            <div>
                <label>Weight (kg): </label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <button onClick={handleSetWeight}>Set Weight</button>
            </div>
            <div>
                <button onClick={handleCheckEligibility}>Check Eligibility</button>
                {isEligible ? <p>You are eligible to donate blood!</p> : <p>Sorry, you are not eligible to donate blood.</p>}
            </div>
        </div>
    );
}

export default BloodDonorApp;
