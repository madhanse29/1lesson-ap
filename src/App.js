
import './App.css';

function App() {
  const names=[
 {name: "ajith", pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU"},
 {name: "kuaar",pic:"http://www.ga.berkeley.edu/wp-content/uploads/2015/08/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"},
 {name: "mapp", pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBpFo-yE9V9f6idya5UCXlwvuTf229Z2Sing&usqp=CAU"},
 {name: "madhan",pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU"},]

  return (
    <div className="App">
      {/* <Msg name="ajith"/>
      <Msg name="kumar"/>
      <Msg name="raj"/> */}
     {names.map((nm)=>(<Msg name={nm.name} pic={nm.pic}/>))}
    </div>
  );
}

function Msg({name,pic}) {
  // const name ="mad"
  return(
    <div>
      <h1 className="head">🤷‍♂️💕{name}╰(*°▽°*)╯</h1>
      <img className="profpic" src={pic} alt={name}/>;
    </div>
  )
  
}

export default App;
