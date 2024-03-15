import PropTypes from 'prop-types';
import './Results.css';

const Results = ({ raffledNumbers, winnerBets, rounds }) => {
  return (
    <>
      <h2>Números Sorteados:</h2>
      <div className="numbersBox">
        {raffledNumbers.map((number, i) => (
          <span
            key={i}
            className="numbersBox--single numbersBox--singleDisabled"
          >
            {number}
          </span>
        ))}
      </div>
      <h2>Vencedores: </h2>
      {winnerBets.length == 0 && <p>Sem apostas vencedoras!</p>}
      {winnerBets.length > 0 && (
        <ul>
          {winnerBets.map((bet, i) => (
            <li key={i}>
              {bet.name} - {bet.cpf} - {bet.betNum}
              <br />
              {bet.numbers.map((number) => number + ' ')}
            </li>
          ))}
        </ul>
      )}
      <p>
        Foram necessárias {rounds} rodadas para termos {winnerBets.length}{' '}
        vencedores!
      </p>
    </>
  );
};

Results.propTypes = {
  raffledNumbers: PropTypes.array,
  winnerBets: PropTypes.array,
  rounds: PropTypes.number,
};

export default Results;