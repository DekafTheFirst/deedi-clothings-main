import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';
import HomeIcon from '@mui/icons-material/Home';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import KeyboardArrowRightOutlined from '@mui/icons-material/KeyboardArrowRightOutlined';

const Banner = ({ pathname, title }) => {
    const segments = pathname.split('/').filter(segment => segment !== '');
    // Split pathname and remove empty segments
    const formatSegment = (segment) => {
        return segment.replace(/-/g, ' ')
            .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
            .replace(/'/g, "'s");
    };

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item home"><Link to="/"><HomeIcon fontSize='small' /> </Link></li>
                {segments.map((segment, index) => (
                    <div className='breadcrumb-item-wrapper' key={index}>
                        <KeyboardArrowRightOutlined fontSize='small' className="breadcrumb-separator" />
                        {index >= segments.length - 1 ? (
                            <li className="breadcrumb-item last" >
                                <span>{title ? title : formatSegment(segment)}
                                </span>
                            </li>
                        ) : (
                            <li className="breadcrumb-item last" >
                                <Link to={`/${segments.slice(0, index + 1).join('/')}`}>
                                    {formatSegment(segment)}
                                </Link>
                            </li>
                        )}
                    </div>

                ))}
            </ol>
        </nav>
    );
};

export default Banner;
