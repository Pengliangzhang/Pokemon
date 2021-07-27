import React from 'react';
import PascalTriangle from './../../components/pascalTriangle'
export default function Home() {
  return (
    <div className="container">
      <PascalTriangle />
      <style jsx>{`
        .header-logo {
          padding: 0px;
          margin: 0px;
          text-align: center
        }
      `}</style>
    </div>
  )
}

// export default withRouter(detailHome)
