import React, { useState, useEffect } from "react";
import "./Countdown.scss"
import { CircularProgress } from "@mui/material";

const Countdown = ({ time }) => {
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        // Parse the target date string into a Date object
        const targetDateLocal = new Date(time);

        // Update the countdown timer every second
        const countdownTimer = setInterval(() => {
            // Get the current date and time
            const currentTime = new Date();

            // Calculate the difference in milliseconds between the target date and the current date
            const difference = targetDateLocal - currentTime;

            // Check if the target date has passed
            if (difference < 0) {
                clearInterval(countdownTimer); // Stop the countdown timer
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            // Convert the difference to days, hours, minutes, and seconds
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Update the remaining time
            setTimeRemaining({ minutes, seconds });
        }, 1000); // Update every second

        // Clear the interval when the component unmounts
        return () => clearInterval(countdownTimer);
    }, [time]);

    return (
        <div className="countdown">
            {timeRemaining ? <span className="minutes">{timeRemaining.minutes}</span> : <CircularProgress color="success" className="circularProgress" size="1rem" />}
            :
            {timeRemaining ? <span className="seconds">{timeRemaining.seconds}</span> : <CircularProgress color="success" className="circularProgress" size="1rem" />}
        </div>
    );
};

export default Countdown;
