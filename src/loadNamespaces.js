// Borrowed from https://github.com/Rezonans/redux-async-connect/blob/master/modules/ReduxAsyncConnect.js#L16
function eachComponents(components, iterator) {
  for (let i = 0, l = components.length; i < l; i++) { // eslint-disable-line id-length
    if (typeof components[i] === 'object') {
      for (let [key, value] of Object.entries(components[i])) {
        iterator(value, i, key);
      }
    } else {
      iterator(components[i], i);
    }
  }
}

function filterAndFlattenComponents(components) {
  const flattened = [];
  eachComponents(components, (Component) => {
    if (Component && Component.namespaces) {

      Component.namespaces.forEach((namespace)=>{
        if (flattened.indexOf(namespace) === -1) {
         flattened.push(namespace);
        }
      });
    }
  });
  return flattened;
}

export default function loadNamespaces({ components, i18n }) {
  const allNamespaces = filterAndFlattenComponents(components);

  return new Promise((resolve)=>{
    i18n.loadNamespaces(allNamespaces, resolve);
  });
}
