import { unslugify } from "../../../utils/slug";

const orderStatuses = [
    {
        slug: 'pending',
        labels: ['pending'], // For now, let's group `pending` and `paid`
        broaderStatus: 'Pending',
        styles: {
            backgroundColor: '#fef4d6', // Same as $pending-color-light
            dotColor: '#c49d0d',        // Same as $pending-color-dark
            textColor: '#f1c40f',       // Same as $pending-color-mid
        }
    },
    {
        slug: 'processing',
        labels: ['processing'],
        broaderStatus: 'Processing',
        styles: {
            backgroundColor: '#ffeeba', // New color suggestion for processing (light orange)
            dotColor: '#ff851b',        // Darker orange
            textColor: '#ff6f00',       // Mid orange
        }
    },
    {
        slug: 'shipped',
        labels: ['shipped', 'in_transit', 'out_for_delivery'],
        broaderStatus: 'Shipped',
        styles: {
            backgroundColor: '#e0f7fa', // Light blue
            dotColor: '#00796b',        // Dark teal
            textColor: '#0097a7',       // Mid blue
        }
    },
    {
        slug: 'delivered',
        labels: ['delivered'],
        broaderStatus: 'Delivered',
        styles: {
            backgroundColor: '#d4f7e2', // Same as $delivered-color-light
            dotColor: '#188f4a',        // Same as $delivered-color-dark
            textColor: '#27b462',       // Same as $delivered-color-mid
        }
    },
    {
        slug: 'cancelled',
        labels: ['cancelled', 'exception', 'unknown'],
        broaderStatus: 'Cancelled/Exception',
        styles: {
            backgroundColor: '#fce4e4', // Same as $cancelled-color-light
            dotColor: '#c0392b',        // Same as $cancelled-color-dark
            textColor: '#e74c3c',       // Same as $cancelled-color-mid
        }
    }
];



export function getOrderStatusDetails(status) {
    for (let group of orderStatuses) {
        if (group.labels.includes(status)) {
            return {
                statusToDisplay: unslugify(status),
                styles: group.styles,
            };
        }
    }


    return {
        broaderStatus: 'Unknown',
        styles: {
            backgroundColor: '#ececec', // Fallback gray
            dotColor: '#b3b3b3',
            textColor: '#999',
        }
    };
}