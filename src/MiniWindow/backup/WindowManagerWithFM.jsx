
import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const StyledWindow = ({ id, position, onClose, onDragEnd }) => {
    const x = useMotionValue(position.x);
    const y = useMotionValue(position.y);

    useEffect(() => {
        x.set(position.x);
        y.set(position.y);
    }, [position, x, y]);

    return (
        <motion.div 
            className="window-container absolute border border-purple-700 rounded-md"
            style={{ 
                width: '300px', 
                borderWidth: '2px',
                x,
                y
            }}
            drag
            dragMomentum={false}
            onDragEnd={(event, info) => {
                onDragEnd(id, { x: info.point.x-100, y: info.point.y-60 });
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity } }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="window-tab bg-purple-700 flex justify-between items-center" style={{ height: '40px', padding: '0 10px', cursor: 'move', borderTopLeftRadius: '2px', borderTopRightRadius: '2px' }}>
                <div className="flex space-x-2">
                    <span className="bg-pink-400 rounded-full w-3 h-3"></span>
                    <span className="bg-orange-400 rounded-full w-3 h-3"></span>
                    <span className="bg-green-400 rounded-full w-3 h-3"></span>
                </div>
                <button onClick={() => onClose(id)} className="text-white">✕</button>
            </div>
            <div className="p-4 bg-white rounded-b-md" style={{ borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px' }}>
                <h1>Window ID: {id}</h1>
                <p>Position: X: {Math.round(x.get())}, Y: {Math.round(y.get())}</p>
            </div>
        </motion.div>
    );
};

StyledWindow.propTypes = {
    id: PropTypes.number.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
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
                        onDragEnd={updateWindowPosition}
                    />
                ))}
            </div>
        </div>
    );
};

export default WindowManager;


/*import PropTypes from 'prop-types';
import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const StyledWindow = ({ id, initialPosition, onClose, onDragEnd }) => {
    const constraintsRef = useRef(null);

    return (
        <motion.div 
            className="window-container absolute border border-purple-700 rounded-md"
            style={{ width: '300px', borderWidth: '2px' }}
            initial={initialPosition}
            drag
            dragMomentum={false}
            dragConstraints={constraintsRef}
            onDragEnd={(event, info) => {
                const newPosition = { x: info.point.x, y: info.point.y };
                onDragEnd(id, newPosition);
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity } }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div ref={constraintsRef} style={{ width: '100%', height: '100%' }}>
                <div className="window-tab bg-purple-700 flex justify-between items-center" style={{ height: '40px', padding: '0 10px', cursor: 'move', borderTopLeftRadius: '2px', borderTopRightRadius: '2px' }}>
                    <div className="flex space-x-2">
                        <span className="bg-pink-400 rounded-full w-3 h-3"></span>
                        <span className="bg-orange-400 rounded-full w-3 h-3"></span>
                        <span className="bg-green-400 rounded-full w-3 h-3"></span>
                    </div>
                    <button onClick={() => onClose(id)} className="text-white">✕</button>
                </div>
                <div className="p-4 bg-white rounded-b-md" style={{ borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px' }}>
                    <h1>Window ID: {id}</h1>
                    <p>Initial Position: X: {Math.round(initialPosition.x)}, Y: {Math.round(initialPosition.y)}</p>
                </div>
            </div>
        </motion.div>
    );
};

StyledWindow.propTypes = {
    id: PropTypes.number.isRequired,
    initialPosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
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
                        initialPosition={window.position}
                        onClose={closeWindow}
                        onDragEnd={updateWindowPosition}
                    />
                ))}
            </div>
        </div>
    );
};

export default WindowManager;
*/

/*
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';

const StyledWindow = ({ id, position, onClose, onDragStop }) => {
    const handleDragStop = (e, data) => {
        onDragStop(id, { x: data.x, y: data.y });
    };

    return (
        <Draggable handle=".window-tab" position={position} onStop={handleDragStop}>
            <motion.div 
                className="window-container absolute border border-purple-700 rounded-md" 
                style={{ width: '300px', borderWidth: '2px' }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
            >
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
            </motion.div>
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

*/