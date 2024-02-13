
import React , { useState, useEffect } from 'react';
import "./UsersTable.css";

// fake data to use while seting it up... May as well use this as my adapter. 



// Special button only used by the Table
const Button = ( {text, children, onClick} ) => {
    const [isHovered, setIsHovered] = useState(false);
    
   
    const buttonStyle = {
        width: 'auto',
        height: '30px',
        margin: 2,
        border: '1px solid #666666',
        color: isHovered ? 'white' : '#c9ddc9',
        borderRadius: 5,
        // change this so if 
        backgroundColor: isHovered ? '#666666' : '#333333'
    };
    
    const buttonText = text || children;
    
    return (
        <button style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
          {buttonText}
        </button>
    );
};

const Search = () => {
    const [ searchText, setSearchText ] = useState('');
    const [hasFocus, setFocus] = useState(false);
    
    const style = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            gap: 5,
            marginLeft: 23,
        },
        textBox: {
            minWidth: 100,
            maxWidth: 300,
            width: 'auto',
            borderRadius: 8,
            height: 30,
            marginTop: 3,
            paddingLeft: 5,
            marginLeft: 5,
            backgroundColor: '#cbcbd4',
            border: hasFocus ? "1px solid red" : "none"
        },
        closeButton: {
            position: 'relative',
            left: '-60px',
            top: '8px',
            color:'#666666', 
            height:'20px',
            backgroundColor: 'transparent',
            fontSize: '18px',
        }
    };
    
    const clearSearchBox = () => {
        const search = document.getElementById('search-box');
        search.value = '';
        setSearchText('');
        search.focus();
        setFocus(true);
    };
    
    const handleChange = (e) => {
        setSearchText(e.target.value);
    };
    
    const handleSearch = () => {
    // seaech the data that is used to pipulate the table and return the results
        alert('Searching for: ' + searchText)
        // do the search and call a routine that wil display results..
        clearSearchBox();
    };
    
    return (
        <div style={style.container}>
            <input id="search-box" type="text"
                placeholder="Search the table contents."
                style={style.textBox}
                onChange={(e) => handleChange(e)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            <Button  onClick={handleSearch}>
               <i className="fas fa-search" />
            </Button>
            <div 
               style={style.closeButton}
               onClick={clearSearchBox}
            ><i className="fas fa-times" />
       
            </div>
        </div>
    );
};

const TableRow = ( {item} ) => {
    /**
     * id: 0,
        user_id: 5, 
        email: 'john.simons@mail.com',
        name: 'john simmons',
        phone: '669-563-4589',
        tier: 'Premium',
        twoFactorAuth: true,
        accountLocked: false,
        notes: "Account locked reason"
     */
    const {id, user_id, email, name, phone, tier, twoFactorAuth, accountLocked, notes} = item;
    return (
        <tr>
            <td>{id}</td>
            <td>{user_id}</td>
            <td>{email}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{tier}</td>
            <td>{twoFactorAuth}</td>
            <td>{accountLocked}</td>
            <td>{notes}</td>
        </tr>
    );
};
const UsersTable = ( { tableData } ) => {

    const tableStyle = {
      mainContainer: {
          // will work just fine without flex.
         // display: 'flex',
          //flexDirection: 'column',
          
          width: 'auto',
          height: 'auto',
          maxHeight: 450,
          border: '1px solid',
          borderRadius: 8,
          backgroundColor: '#111111',
          color: '#f5f5f5',
          padding: 0,
          overflow: 'auto',
      },
      toolbar: {
          display: 'flex',
          borderRadius: 5,
          height: 50,
          width: '100%',
          border: '1px solid #999999',
          justifyContent: 'space-between',
          alignItems: "center",
          overflow: 'none',
      },
      buttonContainer: {
          paddingRight: 10,
          display: 'flex',
          alignItems: 'baseline',
          border: '0px solid white',
      },
      tableContainer: {
          padding:10,
          paddingBottom: 20,
          paddingTop: 20, 
       //   backgroundColor: '#333333',
          overflow: 'auto',
          borderRadius: 8,
       },
    };
    
   //console.log(`tableData:`, tableData)

    return  (
      <div id="tableComponent" style={tableStyle.mainContainer} >
         <div id="toolbar" style={tableStyle.toolbar} >
            <div>
              <Search />
            </div>
            Users Table
            <div id='button-container' style={tableStyle.buttonContainer} >
              <Button>
                  <i className="fas fa-save" />
              </Button>
              <Button>
                  <i className="fa fa-plus" />
             </Button>
              <Button>
                  <i className="fas fa-minus" />
             </Button>
              <Button>
                  <i className="fas fa-pencil" />
             </Button>
              <Button>
                  <i className="fas fa-folder-open" />
             </Button>
            </div>
         </div>
         
         <div id="table-container" style={tableStyle.tableContainer} >  
          
           <table id="table">
             <thead>
               {tableData.headers.map( (item, index ) => {
                   return <th>{item}</th>
               })}
             </thead>
             <tbody>
               {tableData.data.map((item) => {
                   return <TableRow key={item.id} item={item} />
               })}
             </tbody>
           </table>
           
         </div>
      </div> 
    );
 };

 export default UsersTable;