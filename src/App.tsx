import TahoeLayout from './components/TahoeLayout'
import './App.css'

function App() {
  return (
    <TahoeLayout
      sidebarVariant="finder"
      title="Tahoe Dashboard"
      breadcrumbs={[
        { id: 'home', label: 'sutie', icon: '🏠' },
        { id: 'documents', label: '文稿' },
      ]}
    >
      <div className="demo-content">
        <section className="demo-section">
          <h2>Welcome to macOS Tahoe Style</h2>
          <p>
            This layout component features a frosted glass effect with scroll vignettes. The sidebar
            and content area both have transparent gradient overlays when scrolling.
          </p>
        </section>

        <section className="demo-section">
          <h3>Feature Highlights</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🪟</div>
              <h4>Frosted Glass</h4>
              <p>backdrop-filter blur effect on sidebar and content</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📜</div>
              <h4>Scroll Vignette</h4>
              <p>Transparent gradient overlay when scrolling</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h4>macOS Style</h4>
              <p>Tahoe-inspired design with modern aesthetics</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌙</div>
              <h4>Dark Mode</h4>
              <p>Automatic color scheme adaptation</p>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h3>Sample Content</h3>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="content-item">
              <div className="content-item-icon">📄</div>
              <div className="content-item-info">
                <h4>Document {i + 1}</h4>
                <p>Last modified {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </TahoeLayout>
  )
}

export default App
