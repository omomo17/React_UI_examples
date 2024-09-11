
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import Draggable from 'react-draggable';

const StyledWindow = ({ id, position, onClose, onDragStop }) => {
    const handleDragStop = (e, data) => {
        onDragStop(id, { x: data.x, y: data.y });
    };

    return (
        <Draggable handle=".window-tab" position={position} onStop={handleDragStop}>
            <div className="window-container absolute border border-purple-700 rounded-md" style={{ width: '300px', borderWidth: '2px' }}>
                <div className="window-tab bg-purple-700 flex justify-between items-center" style={{ height: '40px', padding: '0 10px', cursor: 'move', borderTopLeftRadius: '2px', borderTopRightRadius: '2px' }}>
                    <div className="flex space-x-2">
                        <span className="bg-pink-400 rounded-full w-3 h-3"></span>
                        <span className="bg-orange-400 rounded-full w-3 h-3"></span>
                        <span className="bg-green-400 rounded-full w-3 h-3"></span>
                    </div>
                    <button onClick={() => onClose(id)} className="text-white">✕</button>
                </div>
                <div className="window-content p-4 bg-white rounded-b-md" style={{ borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px' }}>
                    <h1>Window ID: {id}</h1>
                    <p>Position: X: {position.x}, Y: {position.y}</p>
                </div>
            </div>
        </Draggable>
    );
};

StyledWindow.propTypes = {
    id: PropTypes.number.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onDragStop: PropTypes.func.isRequired,
};

const WindowManager = () => {
    const [windows, setWindows] = useState([]);
    const [windowCount, setWindowCount] = useState(0);

    const createWindow = useCallback(() => {
        const newId = windowCount + 1;
        const newPosition = calculateNewPosition(windows);
        setWindowCount(newId);
        setWindows(prevWindows => [...prevWindows, { id: newId, position: newPosition }]);
    }, [windowCount, windows]);

    const closeWindow = useCallback((id) => {
        setWindows(prevWindows => prevWindows.filter(window => window.id !== id));
    }, []);

    const updateWindowPosition = useCallback((id, newPosition) => {
        setWindows(prevWindows => 
            prevWindows.map(window => 
                window.id === id ? { ...window, position: newPosition } : window
            )
        );
    }, []);

    const calculateNewPosition = (existingWindows) => {
        const baseOffset = 30;
        let newX = baseOffset;
        let newY = baseOffset;

        existingWindows.forEach(() => {
            newX += baseOffset;
            newY += baseOffset;
        });

        return { x: newX, y: newY };
    };

    return (
        <div>
            <button onClick={createWindow} className="bg-blue-500 text-white p-2 rounded mb-4">Create Window</button>
            <div className="windows-container relative">
                {windows.map(window => (
                    <StyledWindow 
                        key={window.id} 
                        id={window.id} 
                        position={window.position}
                        onClose={closeWindow}
                        onDragStop={updateWindowPosition}
                    />
                ))}
            </div>
        </div>
    );
};

export default WindowManager;
