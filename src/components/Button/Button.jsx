// Button.jsx

// import PropTypes from 'prop-types';
import css from './Button.module.css';
export const Button = ({ clickLoad }) => {
  return (
    <button onClick={clickLoad} className={css.Button} type="button">
      Load more
    </button>
  );
};

// export const Button = ({ label, handleLoadMore }) => (
//   <button onClick={handleLoadMore} className={css.Button} type="button">
//     {label}
//   </button>
// );

// Button.propTypes = {
//   label: PropTypes.string,
//   handleLoadMore: PropTypes.func,
// };
