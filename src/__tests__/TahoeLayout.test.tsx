import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TahoeLayout from '../components/TahoeLayout'

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('TahoeLayout Component', () => {
  it('should render with default props', () => {
    render(
      <BrowserRouter>
        <TahoeLayout title="Test Title">
          <div>Test Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <TahoeLayout title="Test">
          <div>Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )
    
    expect(container.querySelector('.tahoe-layout')).toBeInTheDocument()
  })

  it('should render breadcrumbs when provided', () => {
    const breadcrumbs = [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
    ]
    
    render(
      <BrowserRouter>
        <TahoeLayout title="Test" breadcrumbs={breadcrumbs}>
          <div>Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('should render with finder sidebar variant', () => {
    render(
      <BrowserRouter>
        <TahoeLayout title="Test" sidebarVariant="finder">
          <div>Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should render with classic sidebar variant', () => {
    render(
      <BrowserRouter>
        <TahoeLayout title="Test" sidebarVariant="classic">
          <div>Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should handle theme prop (light)', () => {
    const { container } = render(
      <BrowserRouter>
        <TahoeLayout title="Test" theme="light">
          <div>Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )
    
    expect(container.querySelector('.tahoe-layout')).toBeInTheDocument()
  })

  it('should handle theme prop (dark)', () => {
    const { container } = render(
      <BrowserRouter>
        <TahoeLayout title="Test" theme="dark">
          <div>Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )
    
    expect(container.querySelector('.tahoe-layout')).toBeInTheDocument()
  })
})

describe('TahoeLayout Theme Transitions', () => {
  it('should render with system theme', () => {
    const { container } = render(
      <BrowserRouter>
        <TahoeLayout title="Test" theme="system">
          <div>Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )
    
    expect(container.querySelector('.tahoe-layout')).toBeInTheDocument()
  })
})

describe('TahoeLayout Accessibility', () => {
  it('should render children content', () => {
    render(
      <BrowserRouter>
        <TahoeLayout title="Accessible Test">
          <div>Main Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Main Content')).toBeInTheDocument()
  })
})
