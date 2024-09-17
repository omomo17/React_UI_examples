import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const StyledWindow = ({ id, onClose }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [animationOffset, setAnimationOffset] = useState(0);

    const handleDrag = (e, data) => {
        // Subtract animationOffset to get the actual drag position
        setPosition({ x: data.x, y: data.y - animationOffset });
    };

    useEffect(() => {
        let animationFrameId;
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const period = 5000; // 5 seconds for a full cycle
            const t = (elapsed % period) / period;
            const offset = Math.sin(t * 2 * Math.PI) * 20; // Amplitude of 20px

            setAnimationOffset(offset);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <Draggable
            position={{ x: position.x, y: position.y + animationOffset }}
            onDrag={handleDrag}
            handle=".window-tab"
        >
            <div
                className="window-container relative border border-purple-700 rounded-md"
                style={{ width: '300px', borderWidth: '2px' }}
            >
                <div
                    className="window-tab bg-purple-700 flex justify-between items-center"
                    style={{
                        height: '40px',
                        padding: '0 10px',
                        cursor: 'move',
                        borderTopLeftRadius: '2px',
                        borderTopRightRadius: '2px',
                    }}
                >
                    <div className="flex space-x-2">
                        <span className="bg-pink-400 rounded-full w-3 h-3"></span>
                        <span className="bg-orange-400 rounded-full w-3 h-3"></span>
                        <span className="bg-green-400 rounded-full w-3 h-3"></span>
                    </div>
                    <button onClick={() => onClose(id)} className="text-white">
                        ×
                    </button>
                </div>
                <div
                    className="window-content p-4 bg-white rounded-b-md"
                    style={{
                        borderBottomLeftRadius: '6px',
                        borderBottomRightRadius: '6px',
                    }}
                >
                    <h1>Window ID: {id}</h1>
                    <p>
                        Position: X: {position.x}, Y: {position.y}
                    </p>
                </div>
            </div>
        </Draggable>
    );
};

StyledWindow.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
};

const WindowManager = () => {
    const [windows, setWindows] = useState([]);
    const [windowCount, setWindowCount] = useState(0);

    const createWindow = () => {
        setWindowCount(windowCount + 1);
        setWindows([...windows, { id: windowCount + 1 }]);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter((window) => window.id !== id));
    };

    return (
        <div>
            <button
                onClick={createWindow}
                className="bg-blue-500 text-white p-2 rounded mb-4"
            >
                Create Window
            </button>
            <div className="windows-container relative">
                {windows.map((window) => (
                    <StyledWindow
                        key={window.id}
                        id={window.id}
                        onClose={closeWindow}
                    />
                ))}
            </div>
        </div>
    );
};

export default WindowManager;