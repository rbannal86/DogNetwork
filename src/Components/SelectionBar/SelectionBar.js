const SelectionBar = ({ setView }) => {
  const handleClick = (value) => {
    console.log(value);
    setView(value);
  };

  return (
    <div>
      <button onClick={() => handleClick("view")}>Dog View</button>
      <button onClick={() => handleClick("add")}>Dog Add</button>
      <button onClick={() => handleClick(null)}>I'm more into cats</button>
    </div>
  );
};

export default SelectionBar;
