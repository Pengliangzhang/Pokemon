import React from 'react';
import Detail from './../../components/detail'
import { useRouter, withRouter } from 'next/router'
import axios from 'axios';
export default function Home() {
  return (
    <div className="container">
      <main>
        <div className="header-logo">
          <img src="/header2018z-lg.png" />
        </div>
        <div>
          <Detail />
        </div>
      </main>

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
