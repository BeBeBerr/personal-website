function SignalStrip({ items }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="signal-strip" aria-label="Signal strip">
      <div className="signal-strip__track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="signal-strip__item">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

export default SignalStrip;
