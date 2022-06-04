import React, { useState, useEffect } from 'react';
import {  Card, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import * as attendanceService from '../../services/attendanceService';
import debug from 'sabio-debug';
import toastr from '../../utils/toastr.js';
import NavCard from '../host/NavCard';

import './hostattendancepage.css'




const _logger = debug.extend('Attendance');
_logger("Attendance Page")

const AttendanceDropdown = () => {
    
    
    const [show, setShow] = useState(false);

    
    const [pageData, setPageData] = useState({
        attendance: [],
        attendanceComponents: [],
        user: [],
        userComponents: [],
        sessions: [],
        startCounter: 0     
    });


   


    const handleShow = (e) => {
        setShow(true); 
        
        let menuId = parseInt(e.target.name); 

        attendanceService.getSingleWorkShop(0, 10, menuId)
        .then(getSingleWorkShopsSuccess)
        .then(getWorkShopsError);         
    };


    const handleOnChange = (e) => {
        let updateUser = null;
        let currentTarget = parseInt(e.currentTarget.dataset.user);
        const isChecked = e.target.checked;
        const input = e.target.type;
        
        setPageData((prevState) => {
            const pd = { ...prevState }; 
            const newUsers = [...pd.user]; 
        
            for (let i = 0; i < newUsers.length; i++) {
                const element = newUsers[i];
                
                if(currentTarget === element.id){
                    newUsers[i]= {...element, isPresent: !element.isPresent};
                    updateUser = newUsers[i]
                }
            }
            
            if (input === "checkbox" && isChecked === true){
                
                setPageData((prevState)=> {
                   const pd= {...prevState};
                   pd.checkedBox = true;
                   pd.startCounter +=1;
                   return pd;
                   });
           }
           else {
                 setPageData((prevState)=> {
                   const pd= {...prevState};
                
            if (pd.startCounter !== 0) {
                   pd.startCounter -= 1;
                   return pd;
                }    
                  });
           }
            attendanceService.update(updateUser).then(updateSuccessful); 
            pd.userComponents = newUsers.map(mapUserItems);
            pd.user = newUsers;
            return pd;

        });
    };

    const updateSuccessful = (user) => {
        toastr.success(`${user.firstName} ${user.lastName} is marked ${user.isPresent? "Present":"Absent"}`)
    };
    
    const getSingleWorkShopsSuccess = (resp) => {
        _logger('we ova here now', resp);

                let user = resp.item.pagedItems;
                let workshopName= resp.item.pagedItems[0].name;
                let sessiontag = resp.item.pagedItems[0].sessionId;
    
    setPageData((prevState) => {
                const pd = { ...prevState };
                pd.user = user;
                
    
    if(sessiontag)
    {
                 pd.sessions= `${workshopName} ${sessiontag}`;
          
    }
            let counter = 0;

    user.forEach(checked => {

     if (checked.isPresent)
     {
             counter++;
     }
               
      });

                 pd.startCounter = counter;

           return pd;
      });
   };

    useEffect(() => {
        attendanceService.getCurrentWorkshops(0, 10)
        .then(getCurrentWorkshopsSuccess)
        .catch(getWorkShopsError);    
    }, []);

    const getCurrentWorkshopsSuccess = (response) => {
        let attendance = response.data.item.pagedItems;
     setPageData((prevState) => {
            const pd = { ...prevState };
            pd.attendance = attendance; 
            pd.attendanceComponents = attendance.map(mapDropItems);
            return pd; 
        });
    };

    const getWorkShopsError = (response) => {
        _logger({ getAllError: response });
    };

    const mapDropItems = (item) => {  
     return (
         <Dropdown.Item href="#" name={item.sessionId} key={item.id} onClick={handleShow} >
                {item.name}
              
            </Dropdown.Item>
        );
    };

    const mapUserItems = (user) => { 
        return (
            
            <tbody>
             <tr key={user.id}>
                <td><img src={user.avatarUrl} width="40px" height="40px" className="rounded" alt="user" /></td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td><div className="toggle-switch">
                <label>
                    <input
                        type="checkbox"
                        id="checkBox"
                        onChange={handleOnChange}
                        className="toggle-switch-checkbox"
                        name="toggleSwitch"
                        checked={user.isPresent}
                        data-user={user.id}
                    />
                </label>
                 </div>
                </td>
             </tr>
           </tbody>
         );
    };


    

return (
     <React.Fragment>
        <NavCard />
            <Card id="aboutCardIntro">
                <Card.Body id="intro-Attendance-Form">
                    <h2>Attendance Form</h2>
                    <h6>Welcome to your attendance form. This form allows each 
                    and every host to select a class and take attendance when 
                    the workshop is in session. Below you will find a dropdown
                    that will let you pick and select a workshop by sessions. 
                    Once a workshop and session is confirmed, its your responsibility 
                    to mark the checkbox under each name if the user is present. If the user 
                    is absent then you may leave the checkbox unmarked. If the user is marked
                     present on accident, then unclick the checkbox to mark absent.
                    </h6>
                </Card.Body>
            </Card>
            
        <Card id="renderPage">
         <Card.Body>

                 <div className="row" >

                    <div className="column" id="infoContent">
                        
                            <DropdownButton data-toggle="dropdown" title="Select Workshop">
                                
                                <span className="dropdown-item-text">{pageData.attendanceComponents}</span>
                           
                            </DropdownButton>
                
                <div className="Counter">
                               <h4>{show && "Total Attendees:  " }{show && pageData.startCounter}</h4>
                     </div> 
                     </div>

                <div className="column" id="usersDisplay">
                   <div id="attendees" className="d-flex flex-row flex-wrap" >
                   
                <Card>
                <Card.Body id="tableOfUsers">
                            <h4 className="header-title">{show && pageData.sessions}</h4>
                <Table className="mb-0" hover>
                    <thead>
                        <tr>
                            <th>...</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Present?</th>
                        </tr>
                    </thead>
                    {pageData.user.map(mapUserItems)}
                </Table>
                </Card.Body>
                </Card>
                 </div>
                </div>
               </div>
                   
        </Card.Body>
                
      </Card>
            
</React.Fragment>
    );
};

export default AttendanceDropdown;

