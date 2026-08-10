import { Component } from 'react'

export default class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="rounded-xl border border-line bg-soft px-5 py-6 text-center"
            role="status"
          >
            <span className="font-mono text-[0.875rem] text-orange" aria-hidden="true">
              &gt;
            </span>
            <p className="mt-2 font-body text-base leading-[1.5] text-tech">
              {this.props.message ?? 'Esta sección no pudo cargarse.'}
            </p>
          </div>
        )
      )
    }

    return this.props.children
  }
}
