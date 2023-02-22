import React, { useState } from 'react';
import { FadeLoader } from 'react-spinners';

const Loading = ({ loading }) => {
    // let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#3498db");

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#3498db",
    };
    return (
        <div className='loading-container'>
            <div>
                <FadeLoader
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    size={60}
                    aria-label="DotLoader"
                    data-testid="loader"
                />
            </div>
        </div>
    );
};

export default Loading;