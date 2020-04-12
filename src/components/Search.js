import React, { Component } from 'react'
import axios from 'axios';
import '../App.css';


class Search extends Component {
  constructor(props) {
    super(props);
       this.state = {
        search:'',
        amount: 5,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '',
        allmedia: []
      };

        this.handleChange = this.handleChange.bind(this);

 }



 handleChange(event) {
  const val = event.target.value;
  // this.refs.title.value,
    this.setState({[event.target.name]: val}, () => {
      if (val === '') {
        this.setState({ allmedia: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.search
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ allmedia: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  }

   
onAmountChange = (e, index, value) => this.setState({ amount: e.target.value });




  
  render() {
    console.log(this.state.allmedia)
    const posts = this.state.allmedia.map((posts, i) => {
        return(
           <div className="col s4" key={posts.id}>
            <img className="responsive-img" alt="" src={posts.largeImageURL}  />
            </div>
        );
    })





      


    return (
    <div>
    
      <br />
      <div className="container">
        <h3>Search</h3>

        {this.state.search.length > 0 ? (
          <p>You search for  - {this.state.search}</p>
        ) : null}


      
        <form >
        <div className="row">
           <div className="col s8">
             <div className="form-group">
          <label htmlFor="search">Search:</label>
          <input type="text" name="search" value={this.state.search} onChange={this.handleChange} className="form-control" ref="search" />
        </div>
           </div>

            <div className="col s4">
          <label >amount:</label>

              <div className="form-group">
          <select
          name="amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <option value={5}>5</option>         
           <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
        </div>
            </div>
        </div>



       


        



 

        </form>


<div className="row">
        {posts}

        </div>
        </div>
    </div>
    );
  }
}

export default Search;