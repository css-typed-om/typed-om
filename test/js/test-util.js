
function iteratorExpansionUsingNext(iterator) {
  var entries = [];
  var entry = iterator.next();
  while (!entry.done) {
    entries.push(entry.value);
    entry = iterator.next();
  }
  return entries;
}

function iteratorExpansionUsingForOf(iterator) {
  var forOfEntries = [];
  for (let value of iterator) {
    forOfEntries.push(value);
  }
  return forOfEntries;
}
