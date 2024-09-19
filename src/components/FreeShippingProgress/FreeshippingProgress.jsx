import React, { useMemo } from 'react';
import { LinearProgress, Box, Typography, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { Info } from '@mui/icons-material';

const FreeShippingProgress = () => {
    // Get items from the cart state
    const items = useSelector(state => state.cart.items);

    // Calculate the total price of the cart
    const totalPrice = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [items]);

    // Set the free shipping goal
    const freeShippingThreshold = 100;

    // Calculate the progress percentage
    const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

    return (
        <Box sx={{ width: '100%' }}>
            {items.length > 0 && <>
                <Typography variant="body1" sx={{ marginBottom: 0.4, fontSize: 15 }}>
                    {totalPrice >= freeShippingThreshold
                        ? <span>You're eligible for <span className='fw-semibold'>Free Shipping!</span></span>
                        : <span style={{ fontSize: 15 }}>
                            <span className='fw-semibold'>
                                ${Math.max(0, (freeShippingThreshold - totalPrice)).toFixed(2)}
                            </span>{' '}
                            away from <span className='fw-semibold'>Free Shipping!</span>
                        </span>}

                </Typography>
                <div className='d-flex flex-row align-items-center gap-1'>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 9, borderRadius: 5, width: '100%' }}
                    />
                    <Tooltip title='Free Shipping on orders $100 and above'> 
                        <Info fontSize="inherit" className='text-large' />
                    </Tooltip>

                </div>
            </>}


        </Box>
    );
};

export default FreeShippingProgress;
