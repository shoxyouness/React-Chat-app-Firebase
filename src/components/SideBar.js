import Chats from './Chats';
import NavBar from './NavBar';
import Search from './Search';
import classes from  './SideBar.module.css'
const SideBar = () => {
    return(
        <div className={classes.sideBarContainer}>
            <NavBar />
            <Search />
            <Chats />
        </div>
    )
};
export default SideBar;
