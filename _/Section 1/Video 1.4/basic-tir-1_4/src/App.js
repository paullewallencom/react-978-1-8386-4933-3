import React, { Component, useContext } from 'react'
import './App.css'

const AppContext = React.createContext()

class ProductTableProvider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',
        inStockOnly: false,
        products: {PRODUCTS},
        handleFilterTextChange: (filterText) => {
          this.setState({filterText: filterText})
        },
        handleInStockChange: (inStockOnly) => {
          this.setState({inStockOnly: inStockOnly})
        }
      }
    }

    render() {
      return (
        <AppContext.Provider value={this.state}>
          {this.props.children}
        </AppContext.Provider>
      );
    }
}

class ProductCategoryRow extends React.Component {
    render() {
          const category = this.props.category;
          return (
                  <tr>
                    <th colSpan="2">
                      {category}
                    </th>
                  </tr>
                );
        }
}

class ProductRow extends React.Component {
    render() {
          const product = this.props.product;
          const name = product.stocked ?
              product.name :
              <span style={{color: 'red'}}>
                {product.name}
            </span>;

          return (
                  <tr>
                    <td>{name}</td>
                    <td>{product.price}</td>
                  </tr>
                );
        }
}

const ProductTable = () => {
          const context = useContext(AppContext)
          const filterText = context.filterText;
          const inStockOnly = context.inStockOnly;

          const rows = [];
          let lastCategory = null;

          context.products.PRODUCTS.forEach((product) => {
                  if (product.name.indexOf(filterText) === -1) {
                            return;
                          }
                  if (inStockOnly && !product.stocked) {
                            return;
                          }
                  if (product.category !== lastCategory) {
                            rows.push(

                                        // Props: Level 3
                                        <ProductCategoryRow
                                          category={product.category}
                                          key={product.category} />
                                      );
                          }
                  rows.push(
                            // Props: Level 3
                            <ProductRow
                              product={product}
                              key={product.name}
                            />
                          );
                  lastCategory = product.category;
                });

          return (
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </table>
                );
}

class SearchBar extends React.Component {
    render() {
          return ( 
					      <AppContext.Consumer>
								 {context =>
                  <form>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={context.filterText}
                      onChange={(e) => context.handleFilterTextChange(e.target.value)}
                    />
                    <p>
                      <input
                        type="checkbox"
                        checked={context.inStockOnly}
                        onChange={(e) => context.handleInStockChange(e.target.checked)}
                      />
                      {' '}
                      Only show products in stock
                    </p>
                  </form>
								 }
					      </AppContext.Consumer>
                )
        }
}

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class App extends Component {
  render() {
    return (
      <ProductTableProvider>
        <SearchBar />
        <ProductTable />
      </ProductTableProvider>
    );
  }
}

export default App;

