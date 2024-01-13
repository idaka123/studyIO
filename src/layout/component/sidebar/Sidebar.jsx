import {useEffect , useState } from "react";

import './style/sidebar.scss'
import styled from "styled-components";
import SidebarNav from "./sidebar_nav";


const Sidebar = (p) => {
    const {
        isLoading,
        conList,
        selectedCon,
        selectCon
    } = p

    const hdlSelCon = ({id, dayRef}) => {
        console.log("select side bar")
        selectCon({id, dayRef})
    }

    console.log("reload sidebar")

    return ( 
        <div className="container">
            <div className="cover">
                <h2>History</h2>
    { isLoading ?
            (
                <>
                    <div className="body">
                        <div className="spinner-wrapper">
                            <div className="spinner"></div>
                        </div>
                    </div>
                </> 
            ) : (
                <div className="conversation-list" aria-hidden="true">
                {(conList && conList.length > 0 ) ?
                (
                    conList.map((item, index) => (
                    <div className="day-ref-section" key={index}>
                        {item.conversationList.length > 0 && <h4 className="title">{item.dayRef}</h4>}
                        <ul className="day-ref-list">
                            {item.conversationList && 
                            item.conversationList.map((conversation, index) => {
                              return (
                                <SidebarNav 
                                    key={index} 
                                    conversation={conversation}
                                    selectedCon={selectedCon}
                                    dayRef={item.dayRef}
                                    hdlSelCon={hdlSelCon}
                                > </SidebarNav>
                              )
                            })}
                        </ul>
                    </div>
                ))
                ) : (
                    <div className="empty">
                        <p>No conversation</p>
                </div>
)
            }
            </div>
            )
            }
                <Team>
                </Team>

            </div>
        </div>
     );
}

const Team = styled.div`
    width: 100%;
    height: 10vh;
    background-color: var(--primary-color);
    /* padding: initial; */
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`


export default Sidebar;
