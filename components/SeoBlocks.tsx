export function KeyTakeaways({
  answer,
  bestFor,
  stat,
  bottomLine,
}: {
  answer: string;
  bestFor: string;
  stat: string;
  bottomLine: string;
}) {
  return (
    <div className="key-takeaways">
      <h2>Key Takeaways</h2>
      <ul>
        <li><strong>Answer:</strong> {answer}</li>
        <li><strong>Best for:</strong> {bestFor}</li>
        <li><strong>Key Stat/Data:</strong> {stat}</li>
        <li><strong>Bottom Line:</strong> {bottomLine}</li>
      </ul>
    </div>
  );
}

export function SourceNote({
  source = "GTM Flows catalogue and delivery model",
}: {
  source?: string;
}) {
  return (
    <p className="source-note">
      Last updated: August 12, 2026 · Source: {source}.
    </p>
  );
}
