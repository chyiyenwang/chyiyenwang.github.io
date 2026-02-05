import styles from "./link.module.css";

type Brand = "linkedin" | "github";

interface LinkProps {
  icon: string;
  href: string;
  label: string;
  brand: Brand;
}

const brandClass: Record<Brand, string> = {
  linkedin: styles.linkedin,
  github: styles.github,
};

function Link({ icon, href, label, brand }: LinkProps) {
  return (
    <a
      className={[styles.link, brandClass[brand]].filter(Boolean).join(" ")}
      href={href}
      target="_blank"
    >
      <img src={icon} alt={`${brand} icon`} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </a>
  );
}

export default Link;
