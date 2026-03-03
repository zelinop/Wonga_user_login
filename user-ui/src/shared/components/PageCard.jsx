function PageCard({ title, subtitle, children }) {
  return (
    <section className="page-card" aria-label={title}>
      <h2>{title}</h2>
      {subtitle && <p className="muted-text">{subtitle}</p>}
      {children}
    </section>
  )
}

export default PageCard
