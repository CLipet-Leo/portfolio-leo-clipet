import styles from './FooterCustom.module.scss';

export default function FooterCustom() {
  console.log('FooterCustom rendered');
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Mon Site Web (っ▀¯▀)つ</p>
      {/* <p>
        <a href="/privacy-policy">Politique de confidentialité</a> |{' '}
        <a href="/terms-of-service">Conditions d'utilisation</a>
      </p> */}
    </footer>
  );
}
