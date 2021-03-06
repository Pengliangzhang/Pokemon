import React from 'react'
import Table from './../components/table'
export default function Home() {

  return (
    <div className="container">
      <main>
        <div className="header-logo">
          <img src="/header2018z-lg.png" />
        </div>
        <div>
          <Table name="TableComponents" />
        </div>
      </main>

      <style jsx>{`
        .header-logo {
          padding: 0px;
          margin: 0px;
          text-align: center
        }
      `}</style>

      <style jsx global>{`
        .container {
          padding: 0px;
          margin: 0px;
        }
      `}</style>
    </div>
  )
}
