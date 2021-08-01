import Chart from './../../components/chart'

export default function Home() {
  let currentMonthName = 'October'
  return (
    <div className="container">
      <main>
        
        <Chart monthName={currentMonthName}  />
      </main>

      <style jsx>{`
        .body {
          margin: 0 0;
        }
        .container {
          position: relative;
          margin-top: -16px;
          background-color: #172041;
          min-height: 100vh
        }
        p {
          display: inline-block;
          padding: 20px 0px 0px 20px;
          color: white;
          font-size: 30px;
        }
      `}</style>
    </div>
  )
}

// export default withRouter(detailHome)
