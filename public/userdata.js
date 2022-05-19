function UserData(){
    const [data, setData] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);
    setEmail(data.email);
    setPassword(data.password);
    
  
    React.useEffect((props) => {
      // fetch all accounts from the API
      fetch(`/account/userdata/${email}/${password}`)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
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