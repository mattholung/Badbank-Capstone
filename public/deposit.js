function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  
  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow}/>}
        />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [user, setUser]     = React.useState('');
  const ctx = React.useContext(UserContext);

  function handle(){
    console.log(email,amount);
    const url = `account/deposit/${email}/${amount}`;
    (async ()=> {
      var res = await fetch(url); // catchs the response with url data from the database(user)
      var data = await res.json(); //set that user equal to 'data'
      const user = data;
      console.log(data);
      ctx.user.balance += amount;
      console.log(ctx);
      props.setShow(false);
    
    if(!user) {
      props.setStatus('fail!');
      return;      
    }
    
      console.log(user);
      console.log(user.balance);
      props.setStatus('');      
      props.setShow(false);
    })();
    }
  

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}