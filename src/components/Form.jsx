import PropTypes from 'prop-types';
import './Form.css';

const Form = ({ handleSubmit, name, setName, cpf, setCpf }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Digite seu nome:
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          Digite seu cpf:
          <input
            type="number"
            onChange={(e) => setCpf(e.target.value)}
            value={cpf}
          />
        </label>
        <button type="submit" className="btn btn--green">
          Adicionar
        </button>
      </form>
    </>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  name: PropTypes.string,
  setName: PropTypes.func,
  cpf: PropTypes.string,
  setCpf: PropTypes.func,
};

export default Form;
