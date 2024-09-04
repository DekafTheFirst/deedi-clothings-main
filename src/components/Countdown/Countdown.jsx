import React, { useState, useEffect } from "react";
import "./Countdown.scss"
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const Countdown = ({ timeRemaining }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    return (
        <div className="countdown">
            {timeRemaining ? <span className="minutes">{timeRemaining.minutes}</span> : <CircularProgress color="success" className="circularProgress" size="1rem" />}
            :
            {timeRemaining ? <span className="seconds">{timeRemaining.seconds}</span> : <CircularProgress color="success" className="circularProgress" size="1rem" />}
        </div>
    );
};

export default Countdown;
