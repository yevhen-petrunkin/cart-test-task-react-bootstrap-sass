import { BsFillCartFill } from 'react-icons/bs';
import { BsFillCartPlusFill } from 'react-icons/bs';

const CartBtn = ({ number, handleToggle }) => {
  return (
    <button
      className={`position-relative ${
        number === 0 ? 'btn btn-light' : 'btn btn-success'
      }`}
      type="button"
      onClick={handleToggle}
    >
      {number === 0 ? (
        <BsFillCartFill size={30} />
      ) : (
        <BsFillCartPlusFill size={30} />
      )}
      {number !== 0 && (
        <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
          {number}
        </div>
      )}
    </button>
  );
};

export default CartBtn;
