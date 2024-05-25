import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
        <div className="text-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            {/* Add any content or components inside the link if needed */}
          </Link>
        </div>
        <div className="text-center">
          <span className="mb-3 mb-md-0 text-muted">© 2023 FoodMall, Inc</span>
        </div>
      </footer>
    </div>
  )
}
