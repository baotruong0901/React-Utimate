import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react'
import "./Profile.scss"
import ChangePassword from './ChangePassword';
import History from './History';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
const Profile = (props) => {

    return (
        <>
            <Breadcrumb className='container new-header'>
                <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <div className="profile-container container">
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="profile" title="Update Information">
                        1
                    </Tab>
                    <Tab eventKey="password" title="Change Password">
                        <ChangePassword />
                    </Tab>
                    <Tab eventKey="history" title="History">
                        <History />
                    </Tab>
                </Tabs>

            </div>
        </>
    )
}

export default Profile