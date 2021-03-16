import React, { Component } from 'react';

class Buscar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: ''
        };
      }
    
      componentDidMount() {
        fetch("http://localhost:3000/api/buscar")
          .then(res => res.json())
          .then(
            (result) => {
                
              this.setState({
                name: result.name
              });
            },
          )
      }

    render () {
        const { name } = this.state;

        return (
            <h1>{name}</h1>
        )
    }
}

export default Buscar