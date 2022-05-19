function AllData(){
  const [data, setData] = React.useState('');
  //const ctx = React.useContext(UserContext); --This gets replaced with this:

  React.useEffect(() => {
    // fetch all accounts from the API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
    });
  })
  return (
    <>
    <h5>All Data in Store:</h5>
    {data}
    </>
  );
}
