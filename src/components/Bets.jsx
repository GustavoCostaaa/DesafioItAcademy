import PropTypes from 'prop-types';

const Bets = ({ betList, handleRaffle }) => {
  return (
    <>
      <button className="btn btn--yellow" onClick={handleRaffle}>
        Sortear
      </button>
      <h2>Apostas já realizadas:</h2>
      <ul>
        {betList.map((bet, i) => (
          <li key={i}>
            {bet.name} - {bet.cpf} - {bet.betNum}
            <br />
            {bet.numbers.map((number) => number + ' ')}
          </li>
        ))}
      </ul>
    </>
  );
};

Bets.propTypes = {
  betList: PropTypes.array,
  handleRaffle: PropTypes.func,
};

export default Bets;
