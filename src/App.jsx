import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Numbers from './components/Numbers';
import Form from './components/Form';
import Bets from './components/Bets';
import Results from './components/Results';
import { data } from './data/data';

function App() {
  // State to manipulate the stage of the website
  const [stage, setStage] = useState(0);

  // Array with the numbers selected by the user
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  // State for the invalid numbers box
  const [invalidNumbers, setInvalidNumbers] = useState(false);

  // State for the invalid name box
  const [invalidName, setInvalidName] = useState(false);

  // State for the invalid cpf box
  const [invalidCpf, setInvalidCpf] = useState(false);

  // State for the alert of success in the add bet process
  const [success, setSuccess] = useState(false);

  // State for the alert of no bets
  const [noBets, setNoBets] = useState(false);

  // State with name of the user
  const [name, setName] = useState('');

  // State with the cpf of the user
  const [cpf, setCpf] = useState('');

  // State with all the bets
  const [betList, setBetList] = useState([...data]);

  // State that tracks the number of the bet
  const [betNum, setBetNum] = useState(1000 + betList.length);

  // State that stocks the raffled numbers
  const [raffledNumbers, setRaffledNumbers] = useState([]);

  // State to track the winners bets
  const [winnerBets, setWinnerBets] = useState([]);

  // State with the num of rounds
  const [rounds, setRounds] = useState(0);

  // State with all the nums and how much bets they received
  const [numBets, setNumBets] = useState([]);

  // Check if the name and the cpf are "valid"
  const checkNameAndCpf = (name, cpf) => {
    // Create an array with all the letters of the name
    let nameLetters = name.split('');

    // Create an array with all the number of the cpf
    let cpfNumbers = cpf.split('');

    // Check if the name has less than 3 letters
    if (nameLetters.length < 3) {
      // Show the invalid name alert box
      setInvalidName(true);

      // Function to remove the name alert box after 3 seconds
      setTimeout(() => {
        setInvalidName(false);
      }, 3000);
    } else {
      // Check if the cpf has 11 numbers
      if (cpfNumbers.length == 11) {
        return true;
      } else {
        // Show the invalid cpf alert box
        setInvalidCpf(true);

        // Function to remove the cpf alert box after 3 seconds
        setTimeout(() => {
          setInvalidCpf(false);
        }, 3000);
      }
    }
  };

  // Handle the submit of the form that adds a new bet
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedNumbers.length == 5) {
      // Check if the name and cpf are valid
      if (checkNameAndCpf(name, cpf) == true) {
        // Create a new bet object
        let newBet = {
          name: name,
          cpf: cpf,
          numbers: selectedNumbers,
          betNum: betNum,
          correctNumbers: [],
          winner: 'no',
        };
        // Add the newBet to the betList
        setBetList((actualBetList) => [...actualBetList, newBet]);

        // Add 1 to the number of the bet
        setBetNum(betNum + 1);

        // Show the success box
        setSuccess(true);

        // Function to remove the success box after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        return false;
      }
    } else if (selectedNumbers.length < 5) {
      // Show the invalid numbers alert box
      setInvalidNumbers(true);

      // Function to remove the numbers alert box after 3 seconds
      setTimeout(() => {
        setInvalidNumbers(false);
      }, 3000);
    }
  };

  // Function to raffle the numbers
  const handleRaffle = () => {
    if (betList.length != 0) {
      // Changes the stage of the page
      setStage(1);

      // Initialize the variable that will count the amount of rounds
      let roundsCounter = 0;

      // Starts the raffled numbers array
      let newRaffledNumbers = [];
      setRaffledNumbers([]);

      // Starts the array that will contain all of the numbers and how much bets the received
      let numBet = [];

      // Makes a loop to count the amount of times that a number was betted
      for (let i = 0; i < 50; i++) {
        // Pushs a number and initializes it "bets" number to the numBet array
        numBet.push({
          number: i + 1,
          bets: 0,
        });
        // Makes a for for each of the bets
        betList.forEach((bet) => {
          // For for each of the numbers inside of the bet
          bet.numbers.forEach((num) => {
            // Checks if the number is equal to the number in the for now
            if (num == i + 1) {
              // Adds 1 to the bet number in the numBet array
              numBet[i].bets += 1;
            }
          });
        });
      }

      // Updates the numBet array
      setNumBets(numBet);

      // Generate 5 randoms numbers 1 to 50
      for (let i = 0; newRaffledNumbers.length < 5; i++) {
        let newNum = Math.floor(Math.random() * 50) + 1;
        // Check if the number has already been picked
        if (!newRaffledNumbers.includes(newNum)) {
          // Put the new num inside the array
          newRaffledNumbers.push(newNum);
        }
        roundsCounter = 5;
      }
      // Add the raffled numbers to the raffledNumbers state
      setRaffledNumbers(newRaffledNumbers);

      // Check wins
      // For each inside the raffled numbers
      const checkWin = () => {
        let betWinners = [];
        let newBetList = [...betList];
        newRaffledNumbers.forEach((numberRaffled) =>
          // For each inside all the bets
          betList.forEach((bet, i) =>
            // For each to get the numbers selected of each bet
            bet.numbers.forEach((number) => {
              // Verify if there is a correct number in the bet
              if (number == numberRaffled) {
                // Check if the number is already in the correctNumbers array
                if (!bet.correctNumbers.includes(number)) {
                  // Add the correct number to the array
                  newBetList[i].correctNumbers.push(number);
                  // Updates the betList state
                  setBetList(newBetList);
                }
              }
            })
          )
        );
        // Runs through the betList state
        betList.forEach((bet, i) => {
          // Checks if there is a winner
          if (bet.correctNumbers.length == 5) {
            // Updates the winner property for the winner bet
            newBetList[i].winner = 'yes';
            // Updates the betList state
            setBetList(newBetList);
          }
        });

        // Filter the winner bets from the newBetList
        betWinners = newBetList.filter((bet) => bet.winner == 'yes');
        // Check if there is a winner and if less than 30 numbers were raffled
        if (betWinners.length == 0 && newRaffledNumbers.length < 30) {
          let newNum = Math.floor(Math.random() * 50) + 1;
          // Check if the number has already been picked
          if (!newRaffledNumbers.includes(newNum)) {
            // Put the new num inside the array
            newRaffledNumbers.push(newNum);
            // Updates the raffledNumbers state
            setRaffledNumbers(newRaffledNumbers);

            roundsCounter += 1;
          }
          // Shuffle more 25 numbers, checking if someone won
          checkWin();
        } else {
          setRounds(roundsCounter);
          setWinnerBets(betWinners);
        }
      };
      checkWin();
    } else {
      // Show the noBets alert box
      setNoBets(true);

      // Function to remove the noBets box after 3 seconds
      setTimeout(() => {
        setNoBets(false);
      }, 3000);
    }
  };

  // Function to sort the betList array by the number of the bet
  betList.sort((a, b) => {
    if (a.betNum < b.betNum) {
      return 1;
    } else if (a.betNum > b.betNum) {
      return -1;
    } else {
      return 0;
    }
  });

  // Function to sort the winnerBets array by the name of the person
  winnerBets.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    } else {
      return 0;
    }
  });

  // Function to sort the numBets array by the times that a number was bet
  numBets.sort((a, b) => {
    if (a.bets < b.bets) {
      return 1;
    } else if (a.bets > b.bets) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <>
      <Header />
      {stage == 0 && (
        <>
          {invalidNumbers && (
            <div className="alertBox alertBox--red">Selecione 5 números!</div>
          )}
          {invalidName && (
            <div className="alertBox alertBox--red">Digite um nome válido!</div>
          )}
          {invalidCpf && (
            <div className="alertBox alertBox--red">Digite um cpf válido!</div>
          )}
          {success && (
            <div className="alertBox alertBox--green">
              Bilhete adicionado com sucesso!
            </div>
          )}
          {noBets && (
            <div className="alertBox alertBox--red">
              Faça pelo menos um bilhete!
            </div>
          )}
          <Numbers
            selectedNumbers={selectedNumbers}
            setSelectedNumbers={setSelectedNumbers}
          />
          <Form
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            cpf={cpf}
            setCpf={setCpf}
          />
          <Bets betList={betList} handleRaffle={handleRaffle} />
        </>
      )}
      {stage == 1 && (
        <Results
          raffledNumbers={raffledNumbers}
          winnerBets={winnerBets}
          rounds={rounds}
          numBets={numBets}
        />
      )}
    </>
  );
}

export default App;
