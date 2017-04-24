# jQuery select to list
A jQuery plugin turning selects into lists.

## Default initialization
```js
$('.js-select').spSelectToList();
```

## Settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
classes | string | 'js-created-list' | The classes to be applied on the list, space-separated.
itemClasses | string | 'js-created-list__item' | The classes to be applied on each list item, space-separated.
labelWrapTag | string | false | The type of HTML element to wrap each label into (e.g. `span`).
labelWrapClasses | string | false | The classes to be applied on the wrapping elements of the labels, if any.
attributesToKeep | array | [] | An array of attributes already defined on the `option` elements to be applied on each list item as well.
selectFirstIfNone | boolean | false | Sets the first list item as selected if no option is.
selectedClass | string | 'is-selected' | The class applied to the selected list item.
onAfterInit | function | false | A function to be executed before init.
onAfterSelect | function | false | A function to be executed after selection.

## Initialization with custom settings
```js
$('.js-select').spSelectToList({
    classes: 'js-filter-list',
    itemClasses: 'js-filter-list__item',
    labelWrapTag: 'span',
    labelWrapClasses: 'js-filter-list__filter',
    attributesToKeep: ['data-count'],
    selectFirstIfNone: true,
    onAfterInit: function() {
        doSomething();
    }
});
```

### Dependencies
jQuery

### License
Copyright © Steve Piron
