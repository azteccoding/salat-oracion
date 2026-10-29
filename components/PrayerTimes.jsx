import { ISLAMICFINDER_WIDGET_URL } from "@/constants/api";
import styles from "@/styles/site/Home.module.css";

// Widget de IslamicFinder con los horarios de León, Gto.
const PrayerTimes = () => (
  <div className={styles.widget}>
    <iframe
      id="iframe-islamicFinder"
      title="Horarios de oración en León, Guanajuato"
      loading="lazy"
      scrolling="no"
      src={ISLAMICFINDER_WIDGET_URL}
    />
  </div>
);

export default PrayerTimes;
