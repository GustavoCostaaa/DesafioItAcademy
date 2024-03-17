import { PropTypes } from 'prop-types';
import './Award.css';

const Award = ({ winnerBets }) => {
  return (
    <>
      <h2>Prêmios:</h2>
      <ul>
        {winnerBets.map((bet, i) => (
          <li key={i}>
            {bet.name} - {bet.cpf} - {bet.betNum}
            <br />
            {bet.numbers.map((number) => number + ' ')}
            <br />
            {bet.prize}
          </li>
        ))}
      </ul>
    </>
  );
};

Award.propTypes = {
  winnerBets: PropTypes.array,
};

export default Award;
