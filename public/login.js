function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const [user, setUser]     = React.useState(''); 
  const UserContext = React.createContext(null);
  //const ctx = React.useContext(UserContext);
  //const user = ctx.user

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus} setUser={setUser}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function handle(){
    
    const url = `account/login/${email}/${password}`;
    (async ()=> {
      var res = await fetch(url); // catchs the response with url data from the database(user)
      var data = await res.json(); //set that user equal to 'data'
      const user = data;
      //props.setUser(user);
      console.log(data);
      ctx.user = user;
      //ctx.users.find((user) => user.email == email);
      //console.log(ctx);
      console.log(ctx);
      props.setShow(false);
      console.log(email, password);
      
      if (!user) {
        console.log('User does not exist!')      
        props.setStatus('fail!')      
        return;      
      }
      if (user.password == password) {
        console.log('Login successful!') 
        props.setStatus('Welcome to BadBank');
        props.setShow(false);
        return;      
      }
      console.log('Password incorrect')          
      props.setStatus('fail!');        
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

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}