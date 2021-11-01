import { cloneElement, Fragment } from 'react';

function nest(children, component) {
   return cloneElement(component, {}, children);
}

function MultiProvider({ providers, children }) {
   return <Fragment>{providers.reduceRight(nest, children)}</Fragment>;
}

export default MultiProvider;
