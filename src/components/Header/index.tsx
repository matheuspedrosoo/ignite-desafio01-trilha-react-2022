import styles from './Header.module.css';
import logo from '../../assets/logoTodo.svg';

export function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt='Logo foguete' />
      <h1>
        to<span>do</span>
      </h1>
    </div>
  );
}
