import React from 'react';
class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemonInfo: {},
      currentSpending: 120,
      currentIncome: 500,
      month: [
        'Jan'
      ],
      spending: [],
      income: [],
      avgIncome: 0,
      avgSpending: 0,
      overallBudget: 0,
      largest: 0,
      monthName: ''
    },
    this.handleHeight = this.handleHeight.bind(this)
  }
  async componentDidMount() {
    // console.log(this.state.pokemonInfo);
    await this.handleQuery()
    // console.log(this.state.income[this.state.income.length - 1].month)
    this.monthClick(this.state.income[this.state.income.length - 1].month)
  }
  handleHeight(value, type) {
    return (value * (400 / this.state.largest))
  }
  monthClick(month) {
    let obj = {}
    this.state.spending.forEach(element => {
      if (element.month === month) {
        obj.spending = element.spending 
      }
    })
    this.state.income.forEach(element => {
      if (element.month === month) {
        obj.income = element.income 
      }
    })
    let monthName = ''
    switch (month) {
      case 1:
        monthName = 'January'
        break;
      case 2:
        monthName = 'February'
        break;
      case 3:
        monthName = 'March'
        break;
      case 4:
        monthName = 'April'
        break;
      case 5:
        monthName = 'May'
        break;
      case 6:
        monthName = 'June'
        break;
      case 7:
        monthName = 'July'
        break;
      case 8:
        monthName = 'August'
        break;
      case 9:
        monthName = 'September'
        break;
      case 10:
        monthName = 'October'
        break;
      case 11:
        monthName = 'November'
        break;
      case 12:
        monthName = 'December'
        break;
      default:
        break;
    }
    console.log(month, monthName, this.props)
    this.setState ({
      currentIncome: obj.income,
      currentSpending: obj.spending,
      monthName: monthName
    })
  }
  async handleQuery(month) {
    let resp = {
      "overall_budget": 650,
      "spending": 
      [
        {
          "month": 10,
          "spending": 700
        }, {
          "month": 9,
          "spending": 300
        },
        {
          "month": 8,
          "spending": 200
        }, {
          "month": 7,
          "spending": 400
        }
      ],
      "income": [
        {
          "month": 10,
          "income": 500
        }, 
        {
          "month": 9,
          "income": 500 
        },
        {
          "month": 7,
          "income": 1000
        },
        {
          "month": 8,
          "income": 575.55
        }
      ]
    }
    let sortedIncomeList = resp.income.sort((a, b) => {
      return a.month - b.month
    })
    let sortedSpendingList = resp.spending.sort((a, b) => {
      return a.month - b.month
    })
    let largest = 0
    let counterIncome = 0
    sortedIncomeList.forEach(element => {
      if (element.income > largest) {
        largest = element.income
      }
      counterIncome = counterIncome + element.income
    })
    let counterSpending = 0
    sortedSpendingList.forEach(element => {
      if (element.spending > largest) {
        largest = element.spending
      }
      counterSpending = counterSpending + element.spending
    })
    this.setState ({
      income: sortedIncomeList,
      spending: sortedSpendingList,
      avgIncome: counterIncome / sortedIncomeList.length,
      avgSpending: counterSpending / sortedSpendingList.length,
      overallBudget: resp.overall_budget,
      largest: largest
    })
    console.log(this.state.income)
    // this.monthClick(sortedIncomeList[sortedIncomeList.length])
  }
  render() {
    return (
      <div className="chart-container">
        <div>
          <p className='month-name'>{this.state.monthName}</p>
          <br />
          <span className="title">
            <span className="dot spending">.</span>
            <span className="label">Spending</span>
          </span>
          <span className="title">
            <span className="dot income">.</span>
            <span className="label">Income</span>
          </span>
          <div className="current-label-panel">
            <span className="current-label">${ this.state.currentSpending }</span>
            <span className="current-label">${ this.state.currentIncome }</span>
          </div>
          <div className="chart-panel">
            <div className="chart-cols-container">
              <div className="budget-line" style={{"marginBottom": this.handleHeight(this.state.overallBudget)}}>
                <b>Budget</b>
                <br />
                <b>$ {this.state.overallBudget}</b>
                <div className="divider">.</div>
              </div>
              <div className="income-chart-panel">
                {this.state.income.map((item) => {
                  return <div className="base-chart-income" style={{"height": this.handleHeight(item.income, 'income')}}><span key={item.month} className="chart-income-col" /><p onClick={() => this.monthClick(item.month)}> { item.month } </p></div>
                })}
              </div>
              <div className="spend-chart-panel">
                {this.state.spending.map((item) => {
                  return <div className="base-chart-spending" style={{"height": this.handleHeight(item.spending, 'spending')}}><span key={item.month} className="chart-spending-col" /></div>
                })}
              </div>
            </div>
          </div>
        </div>
      <style jsx>{`
      .chart-container {
        margin-left: 30px;
        margin-top: -80px;
      }
      .chart-container .month-name {
        display: inline-block;
        padding: 80px 0px 0px 0px;
        color: white;
        font-size: 30px;
      }
      .chart-container .title {
        margin-top: -80px;
        display: inline-block;
      }
      .dot {
        height: 10px;
        width: 10px;
        font-size: 100px;
        margin-right: 2px;
      }
      .spending{
        color: #428DFC;
      }
      .income{
        color: #0CE381;
      }
      .label {
        color: white;
      }
      .current-label-panel {
        margin-top: -15px;
      }
      .current-label {
        color: white;
        display: inline-block;
        margin-left: 45px;
        margin-top: -40px;
      }
      .chart-panel {
        width: 95%;
        min-height: 500px;
        margin: 0 auto;
        position: relative
      }
      .chart-cols-container {
        text-align: center;
        display: relative;
        margin-left: 550px;
      }
      .income-chart-panel {
        position: absolute;
        bottom: 0px;
      }
      .spend-chart-panel {
        position: absolute;
        bottom: 0px;
        margin-left: 30px;
      }
      .base-chart-income {
        display: inline-block;
        width: 30px;
        margin: -4px 50px;
        background-color: #0CE381;
      }
      .base-chart-spending {
        display: inline-block;
        width: 30px;
        margin: -4px 50px;
        background-color: #428DFC;;
      }
      .chart-cols-container p {
        position: absolute;
        bottom: -45px;
        margin-left: 23px;
        color: #0CE381;
        cursor: pointer;
      }
      // .base-chart-spending p{
      //   display: none;
      // }
      .budget-line {
        // background-color: white;
        text-align: end;
        // line-height: 2px;
        color: white;
        position: absolute;
        bottom: 0px;
        margin-left: -150px;
      }
      .budget-line .divider{
        display: block;
        background-color: white;
        width: 60vw;
        line-height: 4px;
      }
      `}</style>
      </div>
    )
  }
}

export default Chart