# react-amazing-hooks

Welcome to react-amazing-hooks, a collection of custom hooks for React.js!

Each hook in this collection is designed to offer reusability and seamless integration into your projects. Happy coding!

## how to install this library

Get started by installing it via _npm_ or _yarn_.

```
npm install react-amazing-hooks
```

```
yarn add react-amazing-hooks
```

## Docs

| Hook name                | Description                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useArray()`             | Manage an array of items with various functions: _Add, removeById, removeById, removeIndex, replaceAtIndex, replaceById, shuffle, ascendingSort, descendingSort, clear_.                      |
| `useUUID()`              | Used to generate a unique identifier with _high customizability and better performance_.                                                                                                      |
| `useFieldsPopulated()`   | Used to check if object fields are populated or empty.                                                                                                                                        |
| `useSortObjByProperty()` | Sort an array of objects by a property with optional _ascending_ or _descending_ order.                                                                                                       |
| `useMediaQuery()`        | Used to check if the screen size is within a certain range. this hook can be used to conditionally render components based on screen size, or to apply different styles based on screen size. |
| `useStorage()`           | Used to manage state in _localStorage_ (with optional _expiration_) or _sessionStorage_.                                                                                                      |
| `useBrowserLanguage()`   | This will help you to get the _browser language_ with optional formatting.                                                                                                                    |
| `useCopyToClipboard()`   | Custom hook for copying _text to clipboard_ with optional reset time and optional _callback_.                                                                                                 |
| `useToggle()`            | this hook is used to _toggle a boolean_ value with optional _localStorage_ support.                                                                                                           |
| `useOnlineStatus()`      | Detect online status with boolean value (true/false).                                                                                                                                         |
| `useWindowScroll()`      | Tracks _window scroll position_ with usefull information like percentage and position.                                                                                                        |

---

### useArray

```jsx
import { useArray } from "react-amazing-hooks";

function MyComponent() {
  const defaultArray = ["cat", "dog", "bird", { id: 2, name: "lion" }];

  const {
    add,
    clear,
    removeIndex,
    replaceAtIndex, // .. import just what you need!
    replaceById,
    shuffle,
    ascendingSort,
    descendingSort,
    value: currentArray, // renamed value to currentArray
  } = useArray(defaultArray); // the array to be manipulated

  console.log(currentArray); // result

  return (
    <>
      <button onClick={() => add("tiger")}>ADD</button>
      <button onClick={() => removeIndex(2)}>Remove</button>
      <button onClick={() => replaceById(2, "dolphin")}>Replace by ID</button>
      <button onClick={() => replaceAtIndex(3, "giraffe")}>Replace At</button>
      <button onClick={() => shuffle()}>Shuffle</button>
      <button onClick={() => ascendingSort()}>Asc Sort</button>
      <button onClick={() => descendingSort()}>Desc Sort</button>
      <button onClick={clear}>clear</button>
    </>
  );
}

export default MyComponent;
```

### useUUID

```jsx
import { useUUID } from "react-amazing-hooks";

const MyComponent = () => {
  const [uniqueId, regenerateId] = useUUID({
    prefix: "customPREFIX", // prefix, default is empty string
    length: 36, // uuid length, default is 24
    specialChars: false, // include special characters in the uuid, default is false
    excludeChars: "abc", // exclude characters from the uuid
  });

  return (
    <div>
      <p>Unique ID: {uniqueId}</p>
      <button onClick={regenerateId}>Generate New ID</button>
    </div>
  );
};

export default MyComponent;
```

### useFieldsPopulated

```jsx
import { useFieldsPopulated } from "react-amazing-hooks";

const MyComponent = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    age: 0,
  });

  // Checks if all fields are populated and disables the button if not
  const fieldsPopulated = useFieldsPopulated(fields);

  return (
    <>
      <input
        type="text"
        value={fields.name}
        onChange={(e) => setFields({ ...fields, name: e.target.value })}
        placeholder="Your name"
      />
      <div>
        <input
          type="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          placeholder="Your e-mail"
        />
      </div>

      <div>
        <input
          type="number"
          value={fields.age}
          onChange={(e) => setFields({ ...fields, age: e.target.value })}
          placeholder="Your age"
        />
      </div>

      <button disabled={!fieldsPopulated}>SUBMIT</button>
    </>
  );
};

export default MyComponent;
```

### useFieldsPopulated

```jsx
import { useFieldsPopulated } from "react-amazing-hooks";

const MyComponent = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    age: 0,
  });

  // Checks if all fields are populated and disables the button if not
  const fieldsPopulated = useFieldsPopulated(fields);

  return (
    <>
      <input
        type="text"
        value={fields.name}
        onChange={(e) => setFields({ ...fields, name: e.target.value })}
        placeholder="Your name"
      />
      <div>
        <input
          type="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          placeholder="Your e-mail"
        />
      </div>

      <div>
        <input
          type="number"
          value={fields.age}
          onChange={(e) => setFields({ ...fields, age: e.target.value })}
          placeholder="Your age"
        />
      </div>

      <button disabled={!fieldsPopulated}>SUBMIT</button>
    </>
  );
};

export default MyComponent;
```

### useSortObjByProperty

```jsx
import { useSortObjByProperty } from "react-amazing-hooks";

const MyComponent = () => {
  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Alice", age: 30 },
    { id: 3, name: "Bob", age: 20 },
    { id: 4, name: "Doe", age: 35 },
    { id: 5, name: "Jane", age: 22 },
  ];

  const sortedData = useSortObjByProperty(
    data, // the array to sort
    "name", // the property to sort by
    "asc" // the order is: 'asc'|true  OR 'desc'|false
  );

  return (
    <>
      <ul>
        {sortedData.map((item) => (
          <li key={item.id}>
            {item.name} - {item.age}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyComponent;
```

### useMediaQuery

```jsx
import { useMediaQuery } from "react-amazing-hooks";

const MyComponent = () => {
  // just a single value
  const isMobile = useMediaQuery({ query: 550 });
  
  // range between 551 and 767 - 'query' will be ignored
  const isSmallTablet = useMediaQuery({ query: 551, min: 551, max: 767 });

  // range between 768 and 991
  const isTablet = useMediaQuery({ min: 768, max: 991 });
  const isLaptop = useMediaQuery({ min: 992, max: 1119 });
  const isDesktop = useMediaQuery({ min: 1120, max: 1399 });

  // range from 1400 and up. Works the same as just 'max'
  const isLargeDesktop = useMediaQuery({ min: 1400 });

  return (
    <div>
      {isMobile && <p>Mobile</p>}
      {isSmallTablet && <p>Small Tablet</p>}
      {isTablet && <p>Tablet</p>}
      {isLaptop && <p>Laptop</p>}
      {isDesktop && <p>Desktop</p>}
      {isLargeDesktop && <p>Large Desktop</p>}
    </div>
  );
};

export default MyComponent;
```

### useStorage

```jsx
import { useStorage } from "react-amazing-hooks";

const MyComponent = () => {
  // feel free to rename this variable name (users/setUsers)
  const [users, setUsers] = useStorage(
    "users", // key in localStorage|sessionStorage
    [
      { id: 1, name: "Marika", age: 17 },
      { id: 2, name: "Mattia", age: 70 }, // .. values to store!
      { id: 3, name: "Francesco", age: 202 },
      { id: 4, name: "Luca", age: 350 },
    ],
    "localStorage", // localStorage|sessionStorage
    7 // expires in 7 days
  );

  const updateUser = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === 1) {
        // ... this specific user with id === 1
        return { ...user, age: 18 }; // age 17 -> .. changed to 18!
      }
      return user;
    });
    setUsers(updatedUsers); // this will update the state and storage
  };

  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.age}</p>
          </div>
        ))}
      <button onClick={updateUser}>Update user</button>
    </div>
  );
};

export default MyComponent;
```

### useBrowserLanguage

```jsx
import { useBrowserLanguage } from "react-amazing-hooks";

const MyComponent = () => {
  // the first parameter is the format: 'short', 'extend'
  // the second parameter is the text format: 'uppercase', 'capitalize', or 'lowercase'
  const example1 = useBrowserLanguage("extend", "lowercase");
  const example2 = useBrowserLanguage(undefined, "uppercase"); // --> 'short'
  const example3 = useBrowserLanguage("short", "capitalize");

  // ... the rest of your code here!
};

export default MyComponent;
```

### useCopyToClipboard

```jsx
import { useCopyToClipboard } from "react-amazing-hooks";

const MyComponent = () => {
  const handleCopyCallback = () => {
    console.log("hello world!");
  };

  const { copyToClipboard, isCopied, isCopyActionBlocked } = useCopyToClipboard(
    5000, // (optional) reset time in milliseconds, defaults to 0
    handleCopyCallback // (optional) callback function
  );

  const handleClick = () => {
    const textToCopy = "Text to copy"; // example 1
    copyToClipboard(textToCopy);
  };

  const handleClick2 = () => {
    copyToClipboard("Text to copy 2"); // example 2
  };

  return (
    <div>
      <button onClick={handleClick}>Click 1</button>
      <button onClick={handleClick2}>Click 2</button>
      <p>{isCopied && <span>Text copied, well done buddy!</span>}</p>
      <p>{isCopyActionBlocked && <span>Wait a second dude..</span>}</p>
    </div>
  );
};

export default MyComponent;
```

### useToggle

```jsx
import { useToggle } from "react-amazing-hooks";

const MyComponent = () => {
  // feel free to change the initialValue and localStorageKey and to import just what you need!
  const { value, toggle, setValueTo, reset, isValue } = useToggle(
    false, // initialValue
    "myToggle" // localStorageKey
  );

  return (
    <div>
      {/* Display the current value */}
      <p>Current Value: {value.toString()}</p>

      {/* Button to toggle the value */}
      <button onClick={toggle}>Toggle</button>

      {/* Button to set the value to true */}
      <button onClick={() => setValueTo(true)}>Set to True</button>

      {/* Button to set the value to false */}
      <button onClick={() => setValueTo(false)}>Set to False</button>

      {/* Button to reset the value to the initial value */}
      <button onClick={reset}>Reset</button>

      {/* Check if the value is true */}
      {isValue(true) && <p>The value is true</p>}

      {/* Check if the value is false */}
      {isValue(false) && <p>The value is false</p>}
    </div>
  );
};

export default MyComponent;
```

### useOnlineStatus

```jsx
import { useOnlineStatus } from "react-amazing-hooks";

const MyComponent = () => {
  const onlineStatus = useOnlineStatus();

  return (
    <>
      <p>{onlineStatus ? "You are online!" : "You are offline.."}</p>
    </>
  );
};

export default MyComponent;
```

### useWindowScroll

```jsx
import { useWindowScroll } from "react-amazing-hooks";

const MyComponent = () => {
  // .. import just what you need!
  const { x, y, percentageX, percentageY } = useWindowScroll();

  return (
    <>
      <div>
        <p>Horizontal position: {x}</p>
        <p>Vertical position: {y}</p>
        <p>Percentage of horizontal scrolling: {percentageX}%</p>
        <p>Percentage of vertical scrolling {percentageY}%</p>
      </div>
    </>
  );
};

export default MyComponent;
```

### MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the _"Software"_), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

_THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE._
