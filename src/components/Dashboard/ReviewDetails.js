import React from 'react';
import { useParams } from 'react-router-dom';

const ReviewDetails = () => {
    const { id } = useParams();
    return (
        <div>
            ReviewDetails: {id}


            
        </div>
    );
};

export default ReviewDetails;