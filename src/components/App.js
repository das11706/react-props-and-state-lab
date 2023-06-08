import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    // console.log(event)
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value,
      },
    });
  }

  onFindPetsClick = (event) => {
    // console.log(event)
    let url = '/api/pets'
    if (this.state.filters.type === 'all') {
      fetch(url)
      .then((response) => response.json())
      .then(petsList => {
        // console.log(petsList)
        this.setState({ 
          pets: petsList,
        });
      }); 
    } else {
      fetch(url + "?type=" + this.state.filters.type)
      .then((response) => response.json())
      .then(petsList => {
        // console.log(petsList)
        this.setState({ 
          pets: petsList,
        });
      }); 
    }
  }

  onAdoptPet = (id) => {
    // let id = this.state.pets.id
    let updatedPet = this.state.pets.map((pet) => {
    if ( pet.id === id ) {
      return {...pet, isAdopted: true}
    } else {
      return pet
    }
    })
    this.setState({
      pets: updatedPet
    })
  }

  render() {
    // console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
