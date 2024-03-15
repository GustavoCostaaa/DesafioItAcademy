import { useState } from 'react';
import PropTypes from 'prop-types';
import './Numbers.css';

const Numbers = ({ selectedNumbers, setSelectedNumbers }) => {
  // Create an array for the numbers that can be selected
  const numbersSelection = [];

  // State to alert when you try to add more than 5 numbers in the numbersSelection
  const [alertMaxNum, setAlertMaxNum] = useState(false);

  // For to get the number 1=50
  for (let i = 1; i <= 50; i++) {
    // Push each number to the numbersSelection array
    numbersSelection.push(i);
  }

  // Handle click of each span
  const handleClick = (e) => {
    // Gets the span that was clicked
    let elClicked = e.target;

    // Gets the number that was clicked
    let numberSelected = parseInt(elClicked.innerHTML);

    // Checks if the clicked number is in the array of selectedNumbers
    if (selectedNumbers.includes(numberSelected)) {
      // Removes the active class from the clicked span
      elClicked.classList.remove('numberSingle--active');

      // Execute the removeNumber function
      removeNumber(numberSelected);
    } else {
      // Check if the selectedNumbers array has less than 5 itens
      if (selectedNumbers.length < 5) {
        // Add the active class for the span clicked
        elClicked.classList.add('numberSingle--active');

        // Execute the addNewNumber function
        addNewNumber(numberSelected);
      } else {
        // Show the alert when more than 5 numbers are selected
        setAlertMaxNum(true);

        // Function to remove the alert box after 3 seconds
        setTimeout(() => {
          setAlertMaxNum(false);
        }, 3000);
      }
    }
  };

  const addNewNumber = (newNumber) => {
    // Gets the new number and put it into the selectedNumbers array
    setSelectedNumbers((actualSelectedNumbers) => [
      ...actualSelectedNumbers,
      newNumber,
    ]);
  };

  const removeNumber = (removedNumber) => {
    // Creates an array with all selectedNumbers except the one that was clicked
    let newSelectedNumbers = selectedNumbers.filter(
      (num) => num !== removedNumber
    );

    // Set the new array
    setSelectedNumbers(newSelectedNumbers);
  };

  const handleSurpresa = () => {
    // Resets all the selectedNumbers
    setSelectedNumbers([]);

    // Select all spans
    let spanList = document.querySelectorAll('span.numbersBox--single');

    // Resets all the styles from the spans
    for (let i = 0; i < 50; i++) {
      spanList[i].classList.remove('numberSingle--active');
    }

    let newArray = [];

    // Generate 5 randoms numbers 1 to 50
    for (let i = 0; newArray.length < 5; i++) {
      let newNum = Math.floor(Math.random() * 50) + 1;

      // Verify if the number has already been picked
      if (!newArray.includes(newNum)) {
        // Add the new numbers to the selectedNumbers
        addNewNumber(newNum);
        newArray.push(newNum);
        spanList[newNum - 1].classList.add('numberSingle--active');
      }
    }
  };

  return (
    <>
      {alertMaxNum && (
        <div className="alertBox alertBox--red">
          Você já selecionou 5 números!
        </div>
      )}
      <h2>Selecione 5 números:</h2>
      <div className="numbersBox">
        {numbersSelection.map((number) => (
          <span
            key={number}
            className="numbersBox--single"
            onClick={handleClick}
          >
            {number}
          </span>
        ))}
      </div>
      <button className="btn btn--yellow" onClick={handleSurpresa}>
        Surpresa
      </button>
    </>
  );
};

Numbers.propTypes = {
  selectedNumbers: PropTypes.array,
  setSelectedNumbers: PropTypes.func,
};

export default Numbers;
