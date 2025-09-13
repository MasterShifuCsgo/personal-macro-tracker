import Days from './components/days/Days.jsx';
import Foods from './components/foods/Foods.jsx';

export default function Main({ activeComponent }){
  
  return(
    <main>      
      { activeComponent === 'days' ? <Days/> : <Foods/>}
    </main>
  );

}