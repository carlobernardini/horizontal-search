# Orizzonte
> React components for a horizontal, filtered search UI

[![npm version](https://img.shields.io/npm/v/orizzonte.svg)](https://www.npmjs.com/package/orizzonte)
[![Build Status](https://travis-ci.org/carlobernardini/orizzonte.svg?branch=master)](https://travis-ci.org/carlobernardini/orizzonte)
[![Coverage Status](https://coveralls.io/repos/github/carlobernardini/orizzonte/badge.svg?branch=master)](https://coveralls.io/github/carlobernardini/orizzonte?branch=master)
![David](https://img.shields.io/david/carlobernardini/orizzonte.svg)
![gzip size](http://img.badgesize.io/https://npmcdn.com/orizzonte/dist/orizzonte.min.js?compression=gzip)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/carlobernardini/orizzonte/blob/master/LICENSE)

## Usage

The organization of Orizzonte is simple: first you have the encapsulating Orizzonte component, then there are [groups](#group--component) and every group holds one or more [filters](#filters) of its own.
Groups can be added and removed from the Orizzonte bar, so users can include only what is relevant to them. Whenever field values change, Orizzonte will compute a new query
object with all new values from all groups that are currently visible. Here is a basic example.

```js
import Orizzonte, { Choices, Dropdown, FullText, Group, Select, Toggle } from 'orizzonte';

<Orizzonte
  query={{
    language: 'fr',
    waistSize: 32,
    shirtSize: ['m', 'xl']
  }}
  clearedQuerySnapshot={{
    language: 'en'
  }}
  onChange={(query) => {}}
  onGroupAdd={(groupIndex) => {}}
  onGroupRemove={(groupIndex) => {}}
  groupTopLabels
>
  <Group
    description="Choose your shirt and waist sizes"
    label="Sizes"
    included
  >
    <Dropdown
      fieldName="shirtSize"
      label="Shirt Size"
      selectedLabel={ (value, totalCount) => {
        if (value.length <= 2) {
          return `Size (${ value.map((v) => v.label).join(' & ') })`;
        }
        if (value.length === totalCount) {
          return 'Any shirt size';
        }
        return `Size (${ value.length } selected)`;
      }}
      options={[
        {
          value: 'Small sizes',
          children: [
            {label: 'Extra Small',value: 'xs',disabled: true,facetCount: 0},
            {label: 'Small',value: 's',facetCount: 129}
          ]
        },
        {label: 'Medium',value: 'm',facetCount: 213},
        …
      ]}
      multiple
      selectAll
    />
    <Choices
      fieldName="waistSize"
      label="Waist Size"
      selectedLabel={ (value) => (`${ value.selectedLabel || value.label } waist size`) }
      options={[
        {label: 'Extra Small (28)',selectedLabel: 'Extra Small',value: 28,facetCount: 345},
        {label: 'Small (30)',selectedLabel: 'Small',value: 30,facetCount: 12},
        {label: 'Medium (32)',selectedLabel: 'Medium',value: 32,facetCount: 228},
        …
      ]}
      multiple
    />
  </Group>
  <Group
    label="Locale"
    included
  >
    <Select
      fieldName="language"
      label="Language"
      selectedLabel="%s (Primary)"
      options={[
        {label: 'English',value: 'en'},
        {label: 'French',value: 'fr'},
        {label: 'German',value: 'de'},
        …
      ]}
    />
    <Toggle
      fieldName="toggle"
      option={{
        label: 'Toggle me on or off',
        value: 'on'
      }}
      selectedLabel="Toggle is on"
      toggleStateLabel={{
        on: 'Active',
        off: 'Inactive'
      }}
    />
    <Dropdown
      fieldName="country"
      label="Country"
      selectedLabel={selectedLabel}
      options={[
        {label: 'United Kingdom',value: 'uk'},
        {label: 'France',value: 'fr'},
        {label: 'Germany',value: 'de'},
        …
      ]}
      filter={{
        enabled: true,
        placeholder: 'Search options...'
      }}
    />
  </Group>
  <Group
    label="Keywords"
  >
    <FullText
      fieldName="keywords"
      label="Keywords"
      selectedLabel={(value) => (truncate(value.trim(), {
        length: 20
      }))}
      placeholder="Enter some keywords..."
      multiline
    />
    <FullText
      disabled
      fieldName="disabledTextField"
      label="Another field"
      placeholder="This one is disabled..."
    />
  </Group>
</Orizzonte>
```

## Examples

[Click here](https://carlobernardini.github.io/orizzonte/) for a live demo

### Storybook
Orizzonte comes with a [Storybook](https://storybook.js.org/) that you can run yourself

1. Make sure you have Storybook installed (globally):
    ```bash
    $ npm i -g @storybook/cli
    ```

2. Run `npm run storybook`

3. Go to `http://localhost:9001` to see all examples

Click on 'Show info' to see additional implementation details such as supported prop types and their definitions.

## Configuration

### `<Orizzonte />` component

| Prop                          | Type             | Required | Description                                                                                                       |
|-------------------------------|------------------|----------|-------------------------------------------------------------------------------------------------------------------|
| `addBtnLabel`                 | string           | no       | Custom label for add-button                                                                                       |
| `autoExpandOnGroupAdd`        | boolean          | no       | Makes a newly added group auto expand                                                                             |
| `autoHideControls`            | boolean          | no       | If `true`, add, clear and save buttons will hide automatically                                                    |
| `autoHideTimeout`             | number           | no       | Custom timeout interval for auto-hiding controls                                                                  |
| `className`                   | string           | no       | Custom additional class name for the top-level element                                                            |
| `clearAllLabel`               | string           | no       | Custom label for the button to clear all of the query. `onClear` prop needs to be defined for the button to show. |
| `clearedQuerySnapshot`        | object           | no       | Snapshot of initial query state. If set, this will be used to determine if the query diverged from blank-slate.   |
| `collapseGroupOnClickOutside` | boolean          | no       | Whether the group should collapse when the user clicks outside of it. Changes will not be applied to the query.   |
| `groupToggleIcon`             | node             | no       | Toggle indicator icon to be shown in groups                                                                       |
| `groupTopLabels`              | boolean          | no       | Whether the group label should be shown at the top if some of it's filters have selected values                   |
| `hideAddOnAllGroupsIncluded`  | boolean          | no       | Hide the add-button when there are no more groups to add                                                          |
| `dispatchOnFilterChange`      | boolean          | no       | If `true`, the query object will be updated right after any filter change                                         |
| `maxGroups`                   | number           | no       | Maximum number of groups to be added                                                                              |
| `onChange`                    | function         | yes      | Callback function that triggers when the final query object is updated                                            |
| `onClear`                     | function         | no       | Callback function for clearing all of the query. A snapshot of the cleared query state is given as argument.      |
| `onGroupAdd`                  | function         | no       | Callback function for when a new filter group is added                                                            |
| `onGroupRemove`               | function         | no       | Callback function for when a filter group is removed                                                              |
| `onSave`                      | function         | no       | Callback function saving the current query object                                                                 |
| `orientation`                 | `ltr` or `rtl`   | no       | Render groups and controls from left-to-right (`ltr`, default) or right-to-left (`rtl`)                           |
| `query`                       | object           | no       | The current query object                                                                                          |
| `saveLabel`                   | string           | no       | Custom label for the button to save the current query. `onSave` prop needs to be defined for the button to show.  |
| `showGroupControlsOnMouseover`| boolean          | no       | Only show the group controls (remove, done) when hovering over the dropdown list                                  |
| `style`                       | object           | no       | Custom inline styles for the top-level element                                                                    |

### `<Group />` component
Groups contain one or more [filters](#filters) for which it make sense to be shown together. Each group has its own name and can be provided with a description.

| Prop                       | Type             | Required | Description                                                                                                                                                                     |
|----------------------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `className`                | string           | no       | Custom additional class name for top-level component element                                                                                                                    |
| `mutuallyExclusiveFilters` | boolean or array | no       | When `true`, only one filter can be selected for this group. When you want only specific filters to be mutually exclusive, you can provide an array of (two or more) field names. |
| `description`              | string           | no       | A description for this group of filters                                                                                                                                         |
| `doneBtnLabel`             | string           | no       | Custom label for Done-button                                                                                                                                                    |
| `hideClear`                | boolean          | no       | Hides the clear button in the dropdown                                                                                                                                          |
| `hideDone`                 | boolean          | no       | Hides the done button in the dropdown                                                                                                                                           |
| `hideRemove`               | boolean          | no       | Hides the button to remove this group                                                                                                                                           |
| `included`                 | boolean          | no       | If the group should be present in the bar                                                                                                                                       |
| `label`                    | string           | yes      | Label for this group                                                                                                                                                            |
| `orientation`              | `left` or `right`| no       | Default orientation of the group dropdown list                                                                                                                                  |
| `removeBtnLabel`           | string           | no       | Custom label for Remove-button.                                                                                                                                                 |
| `showControlsOnMouseover`  | boolean          | no       | Only show group controls (remove, done) when hovering over the dropdown list element                                                                                                                           |
| `style`                    | object           | no       | Custom inline styles for top-level component element                                                                                                                            |

### Filters
A filter is responsible for controlling the value of a particular field in the query object. Every filter should be included as part of a [group](#group--component).
Orizzonte comes with the following filter types:

| Filter     | Description                                                                       |
|------------|-----------------------------------------------------------------------------------|
| `Choices`  | A series of inline checkboxes or radios                                           |
| `Dropdown` | A more advanced dropdown select with support for filtering options and select all |
| `FullText` | A single or multi line full text field                                            |
| `Select`   | A simple single-select filter (uses browser `<select />` element)                 |
| `Toggle`   | A toggle switch filter for toggling a single-value field on and off               |

#### `<Choices />` filter
A series of inline checkboxes (multiple selections) or radios (single selection). Each Choices filter can have multiple [options](#option-properties).

| Prop                | Type    | Required | Description                                                                                        |
|---------------------|---------|----------|----------------------------------------------------------------------------------------------------|
| `fieldName`         | string  | yes      | Field name for this filter, to be used in composed query                                           |
| `information`       | string  | no       | Help text for this filter, to be shown on mouseover                                                |
| `label`             | string  | no       | Label for this filter                                                                              |
| `multiple`          | boolean | no       | Whether to show checkboxes (`true`) or radios (`false`)                                            |
| `noPreferenceLabel` | string  | no       | Label to show if you want to include a 'no preference' option. Only available for radio groups.    |
| `options`           | array   | yes      | Collection of possible options for this group of choices. Each option must at least have a value.  |

##### `Option` properties
Each option is represented by an object that can have the following properties. All possible options are provided as an array of objects (collection).

| Prop                | Type              | Description                                                                                        |
|---------------------|-------------------|----------------------------------------------------------------------------------------------------|
| `option.disabled`   | bool              | Field name for this filter, to be used in composed query                                           |
| `option.facetCount` | string or number  | Help text for this filter, to be shown on mouseover                                                |
| `option.label`      | string            | Label for this option. If no label is defined, `option.value` will be used instead.                |
| `option.value`      | string or number  | Selected value for this option (required)                                                          |


#### `<Dropdown />` filter
A more advanced dropdown select with support for filtering options and select all. Facet counts for individual [options](#option-properties) are supported.

| Prop                     | Type                    | Required | Description                                                                                                                                                                                                            |
|--------------------------|-------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fieldName`              | string                  | yes      | Field name for this filter, to be used in composed query                                                                                                                                                               |
| `information`            | string                  | no       | Help text for this filter, to be shown on mouseover                                                                                                                                                                    |
| `disabled`               | boolean                 | no       | Disables the dropdown                                                                                                                                                                                                  |
| `filter`                 | object                  | no       | Filter dropdown options and highlight matches                                                                                                                                                                          |
| `filter.enabled`         | boolean                 | yes      | If filtering options should be enabled                                                                                                                                                                                 |
| `filter.matchCase`       | boolean                 | no       | If the dropdown filter is case sensitive                                                                                                                                                                               |
| `filter.matchDiacritics` | boolean                 | no       | If the dropdown filter should strictly match diacritics                                                                                                                                                                |
| `filter.matchPosition`   | `start` or `end`        | no       | Whether to match at any position in the string or from the start                                                                                                                                                       |
| `label`                  | string                  | no       | Label for this filter                                                                                                                                                                                                  |
| `multiple`               | boolean                 | no       | Allows selecting multiple options                                                                                                                                                                                      |
| `notSetLabel`            | string                  | no       | Label to shown when no options are selected                                                                                                                                                                            |
| `options`                | array                   | yes      | Collection of selectable options (property `value` is required, `label` and `disabled` are optional). To create a group of options, use `value` for the group label and add an array of grouped options as `children`. |
| `remote`                 | object                  | no       | Remote API to fetch dropdown options from                                                                                                                                                                              |
| `remote.data`            | object                  | no       | Data object to use as request payload                                                                                                                                                                                  |
| `remote.endpoint`        | string                  | yes      | Remote endpoint URI                                                                                                                                                                                                    |
| `remote.loadingText`     | string                  | no       | Text to show while loading data                                                                                                                                                                                        |
| `remote.searchParam`     | string                  | yes      | Query parameter to apply the filter value to                                                                                                                                                                           |
| `remote.transformer`     | function                | no       | Function for transforming response data before consuming it                                                                                                                                                            |
| `remote.requestMethod`   | string                  | no       | Request method (GET by default)                                                                                                                                                                                        |
| `selectAll`              | boolean                 | no       | Whether to include a select all option on multiselects. This is not supported when remote source is configured.                                                                                                        |
| `selectAllCount`         | boolean                 | no       | Show total option count (excl. disabled options) in select all label                                                                                                                                                   |
| `selectAllLabel`         | string                  | no       | What label to show for the select all option                                                                                                                                                                           |
| `selectedLabel`          | string or function      | no       | Transforming function or placeholder for group label                                                                                                                                                                   |

#### `<FullText />` filter
A single or multi line full text field

| Prop              | Type               | Required | Description                                                                   |
|-------------------|--------------------|----------|-------------------------------------------------------------------------------|
| `autoFocus`       | boolean            | no       | If the input should automatically receive focus when group is expanded        |
| `disabled`        | boolean            | no       | Disables the input field                                                      |
| `dispatchTimeout` | number             | no       | Custom debounce timeout before dispatching the new value to the query object  |
| `fieldName`       | string             | yes      | Field name for this filter, to be used in composed query                      |
| `information`     | string             | no       | Help text for this filter, to be shown on mouseover                           |
| `label`           | string             | no       | Label for this filter section                                                 |
| `maxHeight`       | number             | no       | Maximum textarea height (only applicable in `multiline` mode)                 |
| `maxWidth`        | number             | no       | Maximum textarea width (only applicable in `multiline` mode)                  |
| `multiline`       | boolean            | no       | Whether to render a textarea (`true`) or input field (`false`)                |
| `placeholder`     | string             | no       | Placeholder text for the input field                                          |
| `selectedLabel`   | string or function | no       | Transforming function or placeholder for group label                          |
| `validateInput`   | function           | no       | Function to validate input, should return `true` (valid) or `false` (invalid) |

#### `<Select />` filter
A simple single-select filter (uses browser `<select />` element)

| Prop            | Type               | Required | Description                                                                                                                                                                                                            |
|-----------------|--------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `disabled`      | boolean            | no       | Disables the input field                                                                                                                                                                                               |
| `fieldName`     | string             | yes      | Field name for this filter, to be used in composed query                                                                                                                                                               |
| `information`   | string             | no       | Help text for this filter, to be shown on mouseover                                                                                                                                                                    |
| `label`         | string             | no       | Label for this filter section                                                                                                                                                                                          |
| `notSetLabel`   | string             | no       | Which label the first (empty) option should have in case the select can be empty                                                                                                                                       |
| `options`       | array              | yes      | Collection of selectable options (property `value` is required, `label` and `disabled` are optional). To create a group of options, use `value` for the group label and add an array of grouped options as `children`. |
| `placeholder`   | string             | no       | Placeholder text for the input field                                                                                                                                                                                   |
| `selectedLabel` | string or function | no       | Transforming function or placeholder for group label                                                                                                                                                                   |

#### `<Toggle />` filter
A toggle switch button (affects single value)

| Prop            | Type               | Required | Description                                                                                                                                                                                                            |
|-----------------|--------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `disabled`      | boolean            | no       | Disables the toggle switch                                                                                                                                                                                             |
| `fieldName`     | string             | yes      | Field name for this filter, to be used in composed query                                                                                                                                                               |
| `information`   | string             | no       | Help text for this filter, to be shown on mouseover                                                                                                                                                                    |
| `label`         | string             | no       | Label for this filter                                                                                                                                                                                                  |
| `option`        | object             | yes      | Option that can be toggled (property `value` is required, `label` and `disabled` are optional). A toggle can only take one option. When switched on, the field will be included in the query with the option value     |

## Theming
All customizable variables defaults are found in [`src/scss/variables.scss`](src/scss/variables.scss). To override any variable, 
don't import the compiled distribution CSS that comes with the package but instead, import the Sass source 
in your project's source and redeclare the variables you want before that statement. For example:

```
// Custom variable values
$color-a: blue;
$color-b: red;

// Import Sass source
@import '~orizzonte/src/scss/Orizzonte.scss';
```

Following this method, the styles should be compiled as part of your own project's build process while taking 
in consideration the customizations applied.

## Custom filters
Orizzonte comes with a set of [default filters](#filters) out of the box. If these do not meet your requirements, you can choose
to create a filter of your own. Internally, Orizzonte clones each filter component and adds a few props, in addition 
to the props you configured, that are used to read and update filter values. Any other filter interactivity should 
be managed within the filter component itself.

* `fieldName`
This prop is required to be defined and will be used as the field name (key) for this filter in the query object (if a value is set).
It should only be of type `PropTypes.string`.

* `value`
The current filter value is provided through the `value`-prop and is derived directly from the current query object.
Make sure to define which types you expect to receive for this prop.

* `onUpdate(newValue)`
The filter value can be updated by calling the `onUpdate` function and passing the new value as it's first and only 
argument. Note that the value in the query object will be exactly as passed through the `onUpdate` callback. 
If for any reason the component expects a value representation different from how it's stored in the query, you 
should use a transformer function to convert the internal format from and to the query format.

## Tests

* Run tests: `npm test`
* Test a specific component: `npm test -- <component>.spec.js`
* Run a coverage report: `npm test -- --coverage`
