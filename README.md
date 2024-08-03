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
| `useCopyToClipboard()`   | Custom hook for copying _text to clipboard_ optional _callback_.                                                                                                                              |
| `useToggle()`            | this hook is used to _toggle a boolean_ value with optional _localStorage_ support.                                                                                                           |
| `useOnlineStatus()`      | Detect online status with boolean value (true/false).                                                                                                                                         |
| `useWindowScroll()`      | Tracks _window scroll position_ with usefull information like percentage and position.                                                                                                        |
| `usePagination()`        | This hook is used to _paginate data_. It takes an array of data and the number of items per page as arguments. It also returns some functions to _navigate through the pages_.                |
| `usePreviousValues()`    | Store previous values with a limit. Default is 1 and optional "remove duplicates function" if unique is true.                                                                                 |
| `useHover()`             | Used to indicate when an element is in a hover state. Works with ref, id, and classes.                                                                                                        |
| `useElementVisibility()` | Manages the visibility state of a specific element. Returns a boolean value indicating its visibility state.                                                                                  |

---

### useArray

```jsx
import { useArray } from "react-amazing-hooks";

interface Item {
  id: number;
  [key: string]: any;
}

function MyComponent() {
  const defaultArray: Item[] = [
    { id: 1, name: "cat" },
    { id: 2, name: "dog" },
    { id: 3, name: "bird" },
    { id: 4, name: "lion" },
  ];

  const {
    add,
    clear,
    removeIndex,
    replaceAtIndex,
    replaceById,
    shuffle,
    ascendingSort,
    descendingSort,
    value: currentArray,
  } = useArray(defaultArray);

  return (
    <>
      <div>{JSON.stringify(currentArray)}</div>
      <hr />
      <button onClick={() => add({ id: 5, name: "tiger" })}>ADD</button>
      <button onClick={() => removeIndex(2)}>Remove</button>
      <button onClick={() => replaceById(2, { id: 4, name: "dolphin" })}>
        Replace by ID
      </button>
      <button onClick={() => replaceAtIndex(2, { id: 7, name: "giraffe" })}>
        Replace At
      </button>
      <button onClick={() => shuffle()}>Shuffle</button>
      <button onClick={() => ascendingSort()}>Asc Sort</button>
      <button onClick={() => descendingSort()}>Desc Sort</button>
      <button onClick={() => descendingSort()}>Desc Sort</button>
      <button onClick={clear}>clear</button>
    </>
  );
}

export default MyComponent;
```

### useUUID

```jsx
import { useUUID, generateUUID } from "react-amazing-hooks";

const MyComponent = () => {
  const initialID = useUUID();

  // change 'myUD' and 'setMyID' with your values
  const [myID, setMyID] = useState(initialID);

  // generate a new ID with custom options
  const handleClick = () => {
    setMyID(
      generateUUID({
        prefix: "MY-CUSTOM-ID-",
        length: 15,
        specialChars: false,
        excludeChars: "12345abcde",
      })
    );
  };

  // .. or with default options
  const handleClick2 = () => {
    setMyID(generateUUID());
  };

  return (
    <div>
      <p>Initial ID: {initialID}</p>
      <p>My UUID: {myID}</p>
      <button onClick={handleClick}>UUID With Custom options</button>
      <button onClick={handleClick2}>UUID with Default options</button>
    </div>
  );
};

export default MyComponent;
```

### useFieldsPopulated

```jsx
import { useFieldsPopulated } from "react-amazing-hooks";

const MyComponent = () => {
  const [fields, setFields] = useState<Record<string, unknown>>({
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
        value={fields.name as string}
        onChange={(e) => setFields({ ...fields, name: e.target.value })}
        placeholder="Your name"
      />
      <div>
        <input
          type="email"
          value={fields.email as string}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          placeholder="Your e-mail"
        />
      </div>

      <div>
        <input
          type="number"
          value={fields.age as number}
          onChange={(e) =>
            setFields({ ...fields, age: parseInt(e.target.value) || 0 })
          }
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

interface IOption {
  prop: string; // the property to sort by
  desc: "asc" | "desc" | boolean; // the order is: 'asc'|true  OR 'desc'|false
}

const MyComponent = () => {
  const [options, setOptions] = useState<IOption>({
    prop: "name",
    desc: "asc",
  });

  // your array to sort
  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Alice", age: 30 },
    { id: 3, name: "Bob", age: 20 },
    { id: 4, name: "Doe", age: 35 },
    { id: 5, name: "Jane", age: 22 },
  ];

  const sortedData = useSortObjByProperty(
    data, // the array to sort
    options.prop, // the property to sort by
    options.desc // the order is: 'asc'|true  OR 'desc'|false
  );

  /* .. or in a simpler way
    const sortedData = useSortObjByProperty(
      data,       // the array to sort
      "name",    // the property to sort by
      "asc"     // the order is: 'asc'|true  OR 'desc'|false
    );
  */

  return (
    <>
      <ul>
        {sortedData.map((item) => (
          <li key={item.id}>
            {item.name} - {item.age}
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          setOptions({
            prop: "age",
            desc: "asc",
          })
        }
      >
        ASCESCENT AGES
      </button>
      <button
        onClick={() =>
          setOptions({
            prop: "age",
            desc: "desc",
          })
        }
      >
        DESCENDENT AGES
      </button>
      <button
        onClick={() =>
          setOptions({
            prop: "name",
            desc: "desc",
          })
        }
      >
        DESCENDENT NAMES
      </button>
      <button
        onClick={() =>
          setOptions({
            prop: "name",
            desc: "asc",
          })
        }
      >
        ASCESCENT NAMES
      </button>
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
import { useEffect } from "react";
import { useStorage } from "react-amazing-hooks";

interface Animal {
  id: number;
  name: string;
  sound: string;
}

function App() {
  const myAnimals = [
    { id: 1, name: "cat", sound: "meow" },
    { id: 2, name: "dog", sound: "woof" },
    { id: 3, name: "cow", sound: "moo" },
    { id: 4, name: "pig", sound: "oink" },
    { id: 5, name: "duck", sound: "quack" },
  ];

  const [myStoredValues, setMyStoredValues] = useStorage<Animal[]>(
    "animals", // key
    "localStorage", // localStorage || "sessionStorage"
    7 // expiration days (optional. Default value is 0)
  );

  useEffect(() => {
    setMyStoredValues(myAnimals);
  }, []);

  return (
    <>
      <ul>
        {myStoredValues?.map((el) => {
          return <li key={el.id}>{el.name}</li>;
        })}
      </ul>
    </>
  );
}

export default App;


```

### useBrowserLanguage

```jsx
import { useBrowserLanguage } from "react-amazing-hooks";

const MyComponent: React.FC = () => {
  // the first parameter is the format: 'short', 'full'
  // the second parameter is the text format: 'uppercase', 'capitalize', or 'lowercase'
  const example1 = useBrowserLanguage("short", "lowercase");
  const example2 = useBrowserLanguage(undefined, "uppercase"); // --> 'short'
  const example3 = useBrowserLanguage("short", "capitalize");

  return (
    <>
      <div>
        <div>{example1}</div>
        <div>{example2}</div>
        <div>{example3}</div>
      </div>
    </>
  );
};

export default MyComponent;
```

### useCopyToClipboard

```jsx
import { useCopyToClipboard } from "react-amazing-hooks";

const MyComponent = () => {
  const [inputValue, setInputValue] = useState < string > "";

  // my custom callback function
  const myAmazingCallBack = () => {
    alert("this is just an example callback function");
  };

  // function to handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // use the custom hook with or without a callback function
  const copyToClipboard = useCopyToClipboard(myAmazingCallBack);
  const copyToClipboardWithNoCallback = useCopyToClipboard();

  return (
    <>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div>
        <button onClick={() => copyToClipboard(inputValue)}>
          Copy to Clipboard
        </button>
        <button onClick={() => copyToClipboardWithNoCallback(inputValue)}>
          Copy to Clipboard 2
        </button>
      </div>
    </>
  );
};

export default MyComponent;
```

### useToggle

```jsx
import { useToggle } from "react-amazing-hooks";

const MyComponent = () => {
  // feel free to change the initialValue and localStorageKey and to import just what you need!
  const { value, toggle, setValueTo, isValue } = useToggle(
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
      <div style={{ height: "150em", width: "150em" }}>
        <div style={{ position: "fixed" }}>
          <p>Horizontal position: {x}</p>
          <p>Vertical position: {y}</p>
          <p>Percentage of horizontal scrolling: {percentageX}%</p>
          <p>Percentage of vertical scrolling {percentageY}%</p>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
```

### usePagination

```jsx
import { usePagination } from "react-amazing-hooks";

const MyComponent = () => {
  // Specify the type of data in 'myData'
  type ItemType = {
    id: number,
    name: string,
  };

  const myData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
    { id: 6, name: "Item 6" },
    { id: 7, name: "Item 7" },
    { id: 8, name: "Item 8" },
    { id: 9, name: "Item 9" },
    { id: 10, name: "Item 10" },
  ];

  const {
    paginatedData, // data for the current page
    currentPage, // current page number
    totalPages, // total number of pages
    goToPage, // function to go to a specific page
    nextPage, // function to go to the next page
    prevPage, // function to go to the previous page
    goToFirstPage, // function to go to the first page
    goToLastPage, // function to go to the last page
  } = usePagination < ItemType > (myData, 5); // 5 items per page

  return (
    <div>
      {/* render your paginated data here */}
      {paginatedData.map((item) => (
        <div key={`item_${item.id}`}>{item.name}</div>
      ))}
      {/* pagination controls */}
      <button onClick={goToFirstPage} disabled={currentPage === 1}>
        First
      </button>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span style={{ margin: "0 10px" }}>
        {currentPage} of {totalPages}
      </span>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
      <button onClick={goToLastPage} disabled={currentPage === totalPages}>
        Last
      </button>

      {/* example of using the goToPage function */}
      <button onClick={() => goToPage(3)} disabled={currentPage === totalPages}>
        Go to page 3
      </button>
    </div>
  );
};

export default MyComponent;
```

### usePreviousValues

```jsx
import { usePreviousValues } from "react-amazing-hooks";

const MyComponent = () => {
  const [value, setValue] = useState("React.js");

  const { previousValue } = usePreviousValues({
    value, // the value to store as previous value
    maxValues: 5, // how many previous values to store
    unique: true, // remove duplicates. Default is false
  });

  return (
    <>
      <div>
        <p>
          My favourite JS framework is: <b>{value}</b>
        </p>
        <p>{JSON.stringify(previousValue)}</p>
      </div>
      <div>
        <button onClick={() => setValue("React.js")}>React.js</button>
        <button onClick={() => setValue("Svelte")}>Svelte</button>
        <button onClick={() => setValue("Next.js")}>Next.js</button>
        <button onClick={() => setValue("Angular")}>Angular</button>
        <button onClick={() => setValue("Vue.js")}>Vue.js</button>
      </div>
    </>
  );
};

export default MyComponent;

export default MyComponent;
```

### useHover

```jsx
import { useHover } from "react-amazing-hooks";

const MyComponent = () => {
  const ulRef = useRef(null);

  /* ---------------------- 
 
Custom options object to extend the useHover hook:
  const options = {
    delay: 200, // delay before the hover is considered active
    onHoverStart: () => console.log("Hover started"), // callback function when the hover starts
    onHoverEnd: () => console.log("Hover ended") // callback function when the hover ends
  };
 
  const isHoveredId = useHover('#myId', options);    <---- options object passed as the second argument
  const isHoveredClass = useHover('.myClass', options);
  const isHoveredRef = useHover(ulRef, options); 

*/

  // Using useHover to detect if an element is hovered with..
  const isHoveredId = useHover("#myId"); // .. ID
  const isHoveredClass = useHover(".myClass"); // .. class
  const isHoveredRef = useHover(ulRef); // .. ref

  return (
    <>
      <div>
        <ul>
          <li
            className={`myClass ${
              isHoveredClass ? "custom-class1" : "custom-class-2"
            }`}
          >
            Anakin Skywalker
          </li>
          <li
            id="myId"
            className={`${isHoveredId ? "custom-class1" : "custom-class-2"}`}
          >
            R2-D2
          </li>
          <li
            ref={ulRef}
            className={`${isHoveredRef ? "custom-class1" : "custom-class-2"}`}
          >
            Obi-Wan Kenobi
          </li>
        </ul>
      </div>
      <div>
        <p>{isHoveredClass && "Is Anakin Skywalker your favorite? 😁"}</p>
        <p>{isHoveredId && "Mine is R2-D2! 🤖"}</p>
        <p>{isHoveredRef && "Obi-Wan Kenobi is a good choice too! 👌"}</p>
      </div>
    </>
  );
};

export default MyComponent;
```

### useElementVisibility

```jsx
import { useRef } from "react";
import { useElementVisibility } from "react-amazing-hooks";

const MyComponent = () => {
  const sectionA = useRef(null);
  const isSectionAVisible = useElementVisibility(sectionA, 0); // hook to track visibility of 'sectionA' with 90% threshold (range between 0 and 1)

  return (
    <div style={{ height: "150vh", padding: "25px" }}>
      <div style={{ height: "100vh" }}>Scroll down to see the effect</div>
      <div ref={sectionA}>Section A</div>

      {/* Render 'MyCustomComponent' when sectionA is visible */}
      {isSectionAVisible ? (
        <>
          <div style={{ marginTop: "40vh" }}>
            <p>prova</p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MyComponent;
```
