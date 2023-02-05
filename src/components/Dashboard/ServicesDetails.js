import React from 'react';
import { useParams } from 'react-router-dom';

const ServicesDetails = () => {
    const{id}=useParams();
    return (
        <div>
            Services: {id}
        </div>
    );
};

export default ServicesDetails;