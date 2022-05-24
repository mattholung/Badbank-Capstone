function Home(){
  const ctx = React.useContext(UserContext);
  let i = ctx.user.length - 1;
  const account = ctx.user[i];
  // if(ctx.user[i]) {
    console.log(ctx.user)
  // }
  const header  = `current user: ${account.email}`
  return (
    <Card
      txtcolor="light"
      bgcolor="dark"
      header="BadBank Capstone Project: Matthew Holung"
      title="Welcome to BadBank"
      text="You can move around using the navigation bar. Start by logging in at the top right corner. If you do not have an account, create an account today! This website serves as my project submission. The Capstone Project is part of the MITxPRO and Emeritus Online Course: Full-Stack Development w/ MERN. This is OPTION 1 of 2, refactorying Badbank. It uses the ReactJS framework and runs on a NodeJS server. The back-end is handled using a ExpressJS to make calls to the MongoDB database. The database is ran on a docker container located on my Digital-Ocean droplet. If you have any questions regarding the assignment, feel free to reach out to me."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
