import { Outlet } from 'react-router-dom'
import LeftBar from '../../components/LeftBar/LeftBar'
import TopBar from '../../components/TopBar/TopBar'
import './Main.css'

const Main = () => {
  console.log('Main component rendered');

  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  )
}

export default Main
