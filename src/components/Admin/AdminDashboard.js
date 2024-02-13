import Box from "../elements/Box.js";
import Logo from "../Logo.js";
import Layout from "./Layout.js";
import { useState, useEffect} from "react";
import UsersTable from "./UsersTable.js";
import { populateUsersTable } from "../../api/utils.js";


const styles = {

};


// This is dummy data. 
/*
const tableData = {
  headers: [
      'Table ID',
      'DB Assigned ID:',
      'Email:',
      'Name:',
      'Phone Number:',
      'Account Tier:',
      'Two Factor Auth:',
      'Account Status:',    // logged in, not inactive. locked,
      'Notes:',
  ],
  data: [
      { 
        id: 0,
        user_id: 5, 
        email: 'john.simons@mail.com',
        name: 'john simmons',
        phone: '669-563-4589',
        tier: 'Premium',
        twoFactorAuth: "true",
        accountLocked: "false",
        notes: "Account locked reason"
      }
  ]
};
*/

const AdminDashboard = () => {  
    const [sideBarDisplay, setSideBarDisplay] = useState("none");    
    const [tableData, setTableData] = useState({
      headers: [
        'Table ID',
        'DB Assigned ID:',
        'Email:',
        'Full Name:',
        'Phone Number:',
        'Account Type:',
        'Two Factor Auth:',
        'Account Status:',    // logged in, not inactive. locked,
        'Notes:',
      ],
      data: []
    });


    function Main() {        
      const mainWidth = sideBarDisplay === "none" ? "100%" : "calc(100vw - 490px)";

      return (
        <Box style={{width: mainWidth, height: "calc(100vh - 220px)", border: "1px solid gray", display: "flex", paddingTop: 30, flexDirection: "column"}}>
          <UsersTable tableData={tableData} />
        </Box>
      );
    };

    
    function Navbar() {
      return (
        <Box style={{
          width: "100%", 
          height: 100, 
          border: "0px solid gray", 
          display: "flex", 
          justifyContent: "flex-left",  
          backgroundColor: "rgb(3,3,3)", 
          marginBottom: 10}}>
         
          <Logo width={350}/>
          <Box style={{border: "1px solid gray", width: "100%"}}>

          </Box>

        </Box>
      );
    };


    function Sidebar({ display="flex"}) {
      return (
        <Box style={{display: display, width: "240px", height: "100%", border: "1px solid gray", marginRight:5, backgroundColor: "rgb(3,3,3)"}}>
          <Box style={{display: display, width: "240px", height: "100%", border: "0px solid gray"}}>
            
            Users<br />

            Billing<br />

            Nitifications<br />

          </Box>

        </Box>
      );
    };

    function Sidebar2({ display="flex"}) {
      return (
        <Box style={{display: display, width: "240px", height: "100%", border: "1px solid gray", marginLeft: 5, backgroundColor: "rgb(3,3,3)"}}>
        </Box>
      );
    };

    function Footer() {
      return (
        <Box style={{width: "100%", height: 100, border: "0px solid gray",  backgroundColor: "rgb(3,3,3)", marginTop: 10}}>
        </Box>
      );
    };


    useEffect(() => {      
      
      async function fetchDataForUsersTable() {
        try {
          const data = await populateUsersTable();

          console.log(`data`, data);
          setTableData(data); 

        } catch (error) {
            console.error('Error came back to useEffect:', error);
        }
      };

      function handleResize() {
         if (window.innerWidth < 1200) {
          setSideBarDisplay( "none");

         } else {
          setSideBarDisplay( "flex");
         }
      };


     document.title = "User Workstation: LifePackage 2024";              
     window.addEventListener('resize', handleResize);   
     
     handleResize();     
     fetchDataForUsersTable(); 


     return () => window.removeEventListener('resize', handleResize);

     }, []); 


    return (
        <Layout 
            footer={<Footer />}
            navbar={<Navbar />}
            sidebarLeft={<Sidebar display={sideBarDisplay}/>}
            sidebarRight={<Sidebar2 display={sideBarDisplay} />}
        >        
           {<Main />} 
        </Layout>
    );
};

export default AdminDashboard;
