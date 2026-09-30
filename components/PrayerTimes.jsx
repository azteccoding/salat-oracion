import styles from "@/styles/site/Home.module.css";

// Widget de IslamicFinder con los horarios de León, Gto.
const PrayerTimes = () => (
  <div className={styles.widget}>
    <iframe
      id="iframe-islamicFinder"
      title="Horarios de oración en León, Guanajuato"
      loading="lazy"
      scrolling="no"
      src="https://www.islamicfinder.org/prayer-widget/3998655/hanfi/5/0/15.0/15.0/"
    />
  </div>
);

export default PrayerTimes;
