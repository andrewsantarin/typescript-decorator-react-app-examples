import React, { Component } from 'react';


/**
 * Override class properties.
 *
 * @template T
 * @param {T} constructor
 * @returns
 */
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty: string = "new property";
    hello: string = "override";
  }
}

/**
 * Decorated component using ES7 with TypeScript experimentals.
 *
 * @export
 * @class TypeScriptDecorated
 * @extends {Component}
 * @see https://medium.com/@Charles_Stover/cache-your-react-event-listeners-to-improve-performance-14f635a62e15
 */
@classDecorator
export class TypeScriptDecorated extends Component {
  private property: string = "property";
  private hello: string = "hello";

  render() {
    return (
      <div>
        <h3>TypeScript Decorated Component</h3>
        <div>{this.property}</div>
        <div>{this.hello}</div>
      </div>
    );
  }
}
