import React from 'react';
import './RegisterUser.css';

import { userRegister } from '../api/api.js';
import { isEmailAddress } from '../api/utils.js';
import { useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from "../components/elements/Box.js";
import Paper from "../components/elements/Paper.js";
import TextBox from "../components/elements/TextBox.js";
import Button from "../components/elements/Button.js";
import Space from "../components/Space.js";
import Modal from './Modal';

function UserRegistration() {

    return (
        <Box>

        </Box>
    );
};


export default UserRegistration;