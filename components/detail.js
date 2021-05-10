import React from 'react';
import axios from 'axios';

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemonInfo: {}
    }
  }
  async componentDidMount() {
    let id = window.location.search.split('=')[1]
    const detail = await this.handleQuery(id)
    let temp = {
      id: detail.id,
      english: detail.name.english,
      chinese: detail.name.chinese,
      japanese: detail.name.japanese,
      french: detail.name.french,
      HP: detail.base.HP,
      Attack: detail.base.Attack,
      Defense: detail.base.Defense,
      SpAttack: detail.base["Sp. Attack"],
      SpDefense: detail.base["Sp. Defense"],
      Speed: detail.base.Speed,
      url: detail.imgUrl
    }
    this.setState({
      pokemonInfo: temp
    })
    // console.log(this.state.pokemonInfo);
  }
  handleQuery(id) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3300/pokemon/detail`,
      {
        params: {
          "id": id
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
      <div className="detail-container">
        <div className="pokemon-container">
          <div className="baseInfo">
            <p className="pokemon-info">ID: {this.state.pokemonInfo.id}</p>
            <p className="pokemon-info">Name: {this.state.pokemonInfo.english} | {this.state.pokemonInfo.chinese} | {this.state.pokemonInfo.japanese} | {this.state.pokemonInfo.french}</p>
            <p className="pokemon-info"> Attack: {this.state.pokemonInfo.Attack}</p>
            <p className="pokemon-info"> Defense: {this.state.pokemonInfo.Defense}</p>
            <p className="pokemon-info"> HP: {this.state.pokemonInfo.HP}</p>
            <p className="pokemon-info"> Sp. Attack: {this.state.pokemonInfo.SpAttack}</p>
            <p className="pokemon-info"> Sp. Defense: {this.state.pokemonInfo.SpDefense}</p>
            <p className="pokemon-info"> Speed: {this.state.pokemonInfo.Speed}</p>
          </div>
          <div className="img-container">
            <img src={this.state.pokemonInfo.url} />
          </div>
          <a href="/">Return to list</a>
        </div>
      <style jsx>{`
        .detail-container {
          width: 1140px;
          margin: auto;
          margin-top: 25px;
        }
        .pokemon-container {
          margin-top: 100px;
          text-align: center
        }
        .pokemon-container a {
          margin-top: 40px;
        }
        .baseInfo {
          margin-top: 50px;
          border: 1px solid black;
          width: 50%
        }
        .pokemon-info {
          padding-left: 20px;
        }
        .img-container {
          text-align: end;
          margin-top: -300px;
        }
      `}</style>
      </div>
    )
  }
}

export default Detail