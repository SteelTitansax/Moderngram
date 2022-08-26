import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './components/Post';
import { db, auth } from './firebase'; 
import Modal from '@material-ui/core/Modal'; 
import {makeStyles} from '@material-ui/core/styles';
import {Button, Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed'; 
import Sidebar from "./components/Sidebar";


function getModalStyle(){
  const top = 20;
  const left = 10; 


return {
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(~$(top)%, ~$(left)%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position : 'absolute', 
    width : 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  },
}))

function App() {
const classes = useStyles();
const [modalStyle] = useState(getModalStyle);
const [posts,setPosts]= useState([]); 
const [open,setOpen] = useState(false);
const [openSignIn, setOpenSignIn] = useState(false);
const [password,setPassword] = useState(false);
const [username,setUsername] = useState(false);
const [email,setEmail] = useState(false);
const [user,setUser] = useState(null);


useEffect(()=> {
  const unsubscribe = auth.onAuthStateChanged((authUser) => {
  if(authUser){
    //user has logged in...
    console.log(authUser);
    setUser(authUser);

  }else{
    //user has logged out...
    setUser(null); 
  }
})


return () => {
  //perform some cleanup actions
  unsubscribe(); 
}




},[user, username]);



useEffect(()=> {
db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {

setPosts(snapshot.docs.map(doc => ({
  id: doc.id, 
  post: doc.data()
  })));
 })
}, []);

const signUp = (event) => {
  event.preventDefault(); 
  auth
  .createUserWithEmailAndPassword(email,password)
  .then((authUser) => {
   return authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error) => alert(error.message))
}
const signIn = (event) => {
  event.preventDefault();

  auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=> alert(error.message))

    setOpenSignIn(false);
}

  return (
    <div className="App">

     

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style= {modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
            <img 
            
            src="./imagenes/moderngram.png"
            width="60%"
            alt="logosignyp"
            />

            <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <br/>
            <Button type="submit" onClick={signUp}>Sign Up</Button>

            </center>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style= {modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
            <img 
            src="./imagenes/moderngram.png"
            width="60%"
            alt="logosignyp"
            />

           
            <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <br/>
            <Button className="border mt-2" type="submit" onClick={signIn}>Sign In</Button>

            </center>
          </form>
        </div>
      </Modal>

    <div className = "app__header ">
      <img 
        className="app__headerImage title-header" 
        src="./imagenes/moderngram.png"
        alt="imagenlogo"
        />
        <div className="text-center title-header">
        <h4>Moderngram</h4>

        <h6 style={{fontWeight:"lighter"}}>Wellcome to your favourite social network</h6>

        </div>
              
        { user ? ( <Button className="border button-small-layout" onClick={() => auth.signOut()}>Logout</Button>

        ): (
        <div className="app__loginContainer button-small-layout">
          <Button  className="border mt-3 mr-2" onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button className="border mt-3"  onClick={() => setOpen(true)}>Sign Up</Button>

        </div>
    )}
    </div>
    
    
    <div class="row">

      <div class="col-3">
        <Sidebar/>
      </div>
      <div class="col-9">
      <div className="app__posts">
     
     {
     posts.map(({id, post}) => (
       <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
       ))
     }

   </div>





   {user?.displayName ? ( 

   <ImageUpload username={user.displayName}/>

   ): (
   null
   )}
      </div>
</div>



   

        
    </div>
    
  );
}

export default App;
