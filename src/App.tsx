import React, { Component } from 'react';
import { memorize } from 'memorize-decorator';
import range from 'lodash/range';

import logo from './logo.svg';
import './App.css';
import { TypeScriptDecorated } from 'TypeScriptDecorated';


interface AppProps {
}

interface AppState {
  append: boolean;
  values: (string | number)[];
}


export class App extends Component<AppProps, AppState> {
  state: AppState = {
    append: false,
    values: [
      ...'I am a highly decorated class component and you had better show me some respect!'.split(' '),
      ...range(2000),
    ], 
  };

  /**
   * Performs a `shift()` / `unshift()` to the `values` state, causing the component to rerender.
   *
   * @private
   * @memberof App
   */
  private handleRerenderClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { append, values } = this.state;
    const newAppend = !append;
    const newValues = [ ...values ];

    if (append) {
      newValues.shift();
    } else {
      newValues.unshift('test');
    }

    this.setState({
      append: newAppend,
      values: newValues,
    });
  }

  /**
   * Prints the button's `value` prop on the developer's console.
   * 
   * **Note:**
   *
   * This method was meant to use a `@decorator` method for caching the event handlers by value.
   *
   * I'd rather not use the `@decorator` syntax because:
   * - It's not officially supported yet.
   * - It'll need a special Babel transpiler.
   * - React-Scripts needs to be patched with rewirers/reconfigurators for the Babel transpiler.
   * - It's something which I don't use a lot of, but when I do, I don't need a complicated memoizer.
   *
   * @memoized Takes a `string` or `number` to use as a reference in a cache full of handlers.
   * @param {(string | number)} key A unique value to identify the handler with in cache.
   * @returns {function} Prints the button's `value` prop on the developer's console.
   * @private
   * @memberof App
   */
  private handleButtonClick = memorize((key: string | number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    console.log(event.currentTarget.value);
  });

  private wtf = memorize();

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <TypeScriptDecorated />
        <p />
        <button
          className="App-link"
          onClick={this.handleRerenderClick}
        >
          Rerender this component
        </button>
        {this.state.values.map((value, index) => (
          <div
            className="App-button-container"
            key={index}
          >
            <button
              className="App-button"
              onClick={this.handleButtonClick(value)}
              value={value}
            >
              {value}
            </button>
          </div>
        ))}
        </header>
      </div>
    );
  }
}
