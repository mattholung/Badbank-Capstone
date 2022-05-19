function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [password, setPassword]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
  const ctx = React.useContext(UserContext);  

  function handle(){
    const user = ctx.users.find((user) => user.email == email);
   const url = `account/login/${email}/${password}`;
    (async ()=> {
      var res = await fetch(url); // catchs the response with url data from the database(user)
      var data = await res.json(); //set that user equal to 'data'
      const user = data;
      ctx.users.push(user);
      console.log(data);
      console.log(ctx);
      props.setShow(false);
      console.log(email, password);
      
    if (!user) {
      props.setStatus('fail!')      
      return;      
    }

    setBalance(user.balance);
    console.log(user);
    props.setStatus(`Current balance: ${user.balance}`);      
    props.setShow(false);
  })();
}

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>
    
    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}