import React from 'react';
import { useParams } from 'react-router-dom';

const CarieerEdit = () => {
    const {id}=useParams();
    return (
        <div>
            CarieerEdit: {id}
        </div>
    );
};

export default CarieerEdit;