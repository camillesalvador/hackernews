import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

// function isSearched(searchTerm) {
//   return function(item) {
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    // bind to this constructor
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // dismiss func
  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  render() {
    // deconstruct
    const { searchTerm, list } = this.state;
    // so u can use list.filter(...)
    // orig is this.state.list.filter(...) && this.state.searchTerm
    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}>Search</Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

// class Search extends Component {
//   render() {
//     const { value, onChange, children } = this.props;
//     return (
//       <form>
//         {children}
//         <input type="text" value={value} onChange={onChange} />
//       </form>
//     )
//   }
// }

// function Search({ value, onChange, children }) {
//     return (
//       <form>
//         {children}
//         <input type="text" value={value} onChange={onChange} />
//       </form>
//     )
// }

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>;

// class Table extends Component {
//   render() {
//     const { list, pattern, onDismiss } = this.props;
//     return (
//      <div>
//       {list.filter(isSearched(pattern)).map(item =>
//         <div key={item.objectID}>
//           <span>
//             <a href={item.url}>{item.title}</a>
//           </span>
//             <span>{item.author}</span>
//               <span>{item.num_comments}</span>
//               <span>{item.points}</span>
//               <span>
//                 <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
//               </span>
//         </div>
//       )}
//     </div>
//     );
//   }
// }

const Table = ({ list, pattern, onDismiss }) =>
  <div>
    {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
            <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
              </span>
        </div>
      )}
  </div>;

// class Button extends Component {
//   render() {
//     // classname is optional so use default
//     const { onClick, className = '' , children } = this.props;

//     return (
//       <button onClick={onClick} className={className} type="button">{children}</button>
//     )
//   }
// }

const Button = ({ onClick, className = '', children }) => <button onClick={onClick} className={className} type="button">{children}</button>;

export default App;
