import styles from "../styles/Home.module.css"

function Footer() {
  return (
    <div className={styles.footer}>
        <img className={styles.fimage} src='./next.svg' />
        <a>Terms</a>
        <a>Privacy</a>
        <a>Securty</a>
        <a>Status</a>
        <a>Docs</a>
        <a>Blog</a>
        <a>About</a>
    </div>
  )
}

export default Footer