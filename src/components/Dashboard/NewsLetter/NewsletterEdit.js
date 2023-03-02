import React from 'react';
import { useParams } from 'react-router-dom';

const NewsletterEdit = () => {
    const {id}=useParams();
    return (
        <div>
            NewsletterEdit:{id}
        </div>
    );
};

export default NewsletterEdit;