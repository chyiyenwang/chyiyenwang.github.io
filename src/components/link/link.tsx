import styles from './link.module.css';

type ColorTypes = 'linkedin' | 'github';

interface LinkProps {
  icon: string;
  href: string;
  label: string;
  color: ColorTypes;
}

function Link({ icon, href, label, color }: LinkProps) {
  return (
    <a
      className={
        [styles.link, color]
          .filter(Boolean)
          .join(' ')
      }
      href={href}
      target='_blank'
    >
      <img
        src={icon}
        className={styles.icon}
      />
      <span className={styles.label}>
        {label}
      </span>
    </a>
  )
}

export default Link;