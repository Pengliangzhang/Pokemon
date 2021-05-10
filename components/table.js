import React from 'react';
import axios from 'axios';

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      pageIndex: 1,
      pageSize: 30,
      totalPages: 1,
      keyWord: '',
      data: [],
      columns: [
        {
          Header: '#',
          accessor: 'id'
        },
        {
          Header: 'Name',
          accessor: 'name.english'
        },
        {
          Header: 'Type',
          accessor: 'type'
        },
        {
          Header: 'HP',
          accessor: 'HP'
        },
        {
          Header: 'Attack',
          accessor: 'attack'
        },
        {
          Header: 'Defense',
          accessor: 'defense'
        },
        {
          Header: 'Sp.Atk',
          accessor: 'sp.atk'
        },
        {
          Header: 'Sp.Def',
          accessor: 'sp.def'
        },
        {
          Header: 'Speed',
          accessor: 'speed'
        }
      ]
    }
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this)
  }
  async componentDidMount() {
    //TODO
    let pageIndex = this.state.pageIndex
    let resp = await this.handleQuery(pageIndex, this.state.pageSize, this.state.keyWord)
    this.setState ({
      data: resp.data,
      totalPages: resp.totalPages,
      pageIndex: resp.pageIndex
    })
  }
  async previousPage() {
    // this.props
    let pageIndex = this.state.pageIndex
    if (pageIndex>1) {
      pageIndex --
      let resp = await this.handleQuery(pageIndex, this.state.pageSize, this.state.keyWord)
      this.setState ({
        data: resp.data,
        totalPages: resp.totalPages,
        pageIndex: resp.pageIndex
      })
    }
  }
  async nextPage() {
    let pageIndex = this.state.pageIndex
    if (pageIndex<this.state.totalPages) {
      pageIndex ++
      let resp = await this.handleQuery(pageIndex, this.state.pageSize, this.state.keyWord)
      this.setState ({
        data: resp.data,
        totalPages: resp.totalPages,
        pageIndex: resp.pageIndex
      })
    }
  }
  async handleSearch() {
    let pageIndex = 1
    let resp = await this.handleQuery(pageIndex, this.state.pageSize, this.state.keyWord)
    this.setState ({
      data: resp.data,
      totalPages: resp.totalPages,
      pageIndex: resp.pageIndex
    })
  }
  handleInputChanged(e) {
    this.setState({
      keyWord: e.target.value
    })
  }

  handleQuery(pageIndex, pageSize, keyWord) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3300/pokemon/list',
      {
        params: {
          "pageIndex": pageIndex,
          "pageSize": pageSize,
          "keyWord": keyWord
        }
      })
      .then(function (response) {
        resolve(response.data.respData)
      })
      .catch(function (error) {
        console.log(error);
        reject()
      });
    })
  }

  render() {
    return (
      <div className="content-table">
        <div className="search-form">
          <p>Name: <input type="text" onChange={this.handleInputChanged.bind(this)} value={this.state.keyWord} /><button onClick={this.handleSearch}>Search</button></p>
        </div>
        <table>
          <thead>
            <tr>
              {this.state.columns.map((item) => {
                return <th key={item.accessor}>{item.Header}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item) => {
              return <tr key={item.id}>
                <td key={item.id+'id'}>{item.id}</td>
                <td key={item.id+'name'}><a href={"/detail?id="+item.id} >{item.name.english}</a></td>
                <td key={item.id+'type'}>{item.type.join(' | ')}</td>
                <td key={item.id+'hp'}>{item.base.HP}</td>
                <td key={item.id+'attack'}>{item.base.Attack}</td>
                <td key={item.id+'defense'}>{item.base.Defense}</td>
                <td key={item.id+'spAttack'}>{item.base["Sp. Attack"]}</td>
                <td key={item.id+'spDefense'}>{item.base["Sp. Defense"]}</td>
                <td key={item.id+'speed'}>{item.base.Speed}</td>
              </tr>
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button disabled={this.state.pageIndex==1} onClick={this.previousPage}>Previous</button>
          <span className="pageIndex">{this.state.pageIndex}/{this.state.totalPages}</span>
          <button disabled={this.state.pageIndex==this.state.totalPages} onClick={this.nextPage}>Next</button>
        </div>
        <style jsx>{`
          .pagination{
            width: 1140px;
            margin: auto;
            margin-top: 25px;
          }
          .pageIndex {
            padding: 0px 20px;
          }
          .search-form {
            text-align: center;
            height: 50px;
          }
          .search-form input{
            height: 34px;
          }
          .search-form button {
            background-color: #008CBA;
            border: none;
            color: white;
            padding: 14px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 10px;
            border-radius:3px;
            margin-left: 20px;
            cursor: pointer;
          }
          .content-table {
            display: block;
            text-align: center;
          }
          .content-table table{
            width: 1140px;
            margin: auto;
          }
          .content-table table th{
            background-color: #ebebe5;
          }
        `}</style>
      </div>
    )
  }
}

export default Table;