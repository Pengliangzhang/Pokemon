import React from 'react';

class PascalTriangle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonItems: []
    }
  }
  async componentDidMount() {
    // this.setState({
    //   pokemonInfo: temp
    // })
    // console.log(this.state.pokemonInfo);
    let arr = []
    for (let index = 0; index < 9; index++) {
      arr.push(index)
    }
    this.setState({
      buttonItems: arr
    })
  }
  handleButtonClick(index) {
    console.log(index)
  }
  render() {
    let buttonArray
    return (
      <div className="pascal-triangle-container">
        <p>lalala</p>
        <div>
          <button onClick={this.handleButtonClick(1)}></button>
        </div>
      <style jsx>{`
        .pascal-triangle-container {

        }
        .pascalTriangleButton {
        }
      `}</style>
      </div>
    )
  }
}

export default PascalTriangle