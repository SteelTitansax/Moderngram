import React from 'react'
import './Sidebar.css';
import SidebarRow from "./SidebarRow";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import HomeIcon from "@material-ui/icons/Home";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OnDemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAlt";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMore";


function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarRow selected Icon = {HomeIcon} title ="Home"/>
            <SidebarRow Icon = {WhatshotIcon} title ="Trending"/>
            <SidebarRow Icon = {SubscriptionsIcon} title ="Subscription"/>
            <hr/>
            <SidebarRow Icon = {VideoLibraryIcon} title ="Library"/>
            <SidebarRow Icon = {HistoryIcon} title ="History"/>
            <SidebarRow Icon = {OnDemandVideoIcon} title ="Your pictures"/>
            <SidebarRow Icon = {WatchLaterIcon} title ="Watch Later"/>
            <SidebarRow Icon = {ThumbUpAltOutlinedIcon} title ="Liked pictures"/>
            <SidebarRow Icon = {ExpandMoreOutlinedIcon} title ="Show more"/>
            <hr/>
        </div>
    )
}

export default Sidebar
