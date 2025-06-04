const PrayerTimes = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <iframe
        id="iframe-islamicFinder"
        title="prayerWidget"
        language="ES-MX"
        className="widget-m-top"
        style={{
          height: "358px",
          border: "1px",
          solid: "#ddd",
        }}
        scrolling="no"
        src="https://www.islamicfinder.org/prayer-widget/3998655/hanfi/5/0/15.0/15.0/"
      ></iframe>
    </div>
  );
};

export default PrayerTimes;
