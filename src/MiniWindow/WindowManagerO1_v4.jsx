import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const WindowManager = () => {
    const [windows, setWindows] = useState([]);
    const [windowCount, setWindowCount] = useState(0);
    const containerRef = useRef(null);

    const createWindow = () => {
        setWindowCount((prevCount) => prevCount + 1);
        const newWindow = {
            id: windowCount + 1,
            position: { x: 30 * windows.length, y: 30 * windows.length },
        };
        setWindows((prevWindows) => [...prevWindows, newWindow]);
    };

    const closeWindow = (id) => {
        setWindows((prevWindows) => prevWindows.filter((window) => window.id !== id));
    };

    const updateWindowPosition = (id, position) => {
        setWindows((prevWindows) =>
            prevWindows.map((window) =>
                window.id === id ? { ...window, position } : window
            )
        );
    };

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <style>
                {`
                /* 必要なスタイルを追加 */
                .bg-blue-500 { background-color: #4299e1; }
                .text-white { color: #ffffff; }
                .p-2 { padding: 0.5rem; }
                .rounded { border-radius: 0.25rem; }
                .mb-4 { margin-bottom: 1rem; }
                .relative { position: relative; }
                .border { border-width: 1px; }
                .border-purple-700 { border-color: #6b46c1; }
                .rounded-md { border-radius: 0.375rem; }
                .bg-purple-700 { background-color: #6b46c1; }
                .bg-purple-800 { background-color: #5a3696; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .items-center { align-items: center; }
                .space-x-2 > :not([hidden]) ~ :not([hidden]) { margin-left: 0.5rem; }
                .bg-pink-400 { background-color: #f687b3; }
                .bg-orange-400 { background-color: #f6ad55; }
                .bg-green-400 { background-color: #68d391; }
                .w-3 { width: 0.75rem; }
                .h-3 { height: 0.75rem; }
                .p-4 { padding: 1rem; }
                .rounded-b-md {
                    border-bottom-left-radius: 0.375rem;
                    border-bottom-right-radius: 0.375rem;
                }
                .window-tab:hover {
                    background-color: #5a3696; /* ホバー時の色 */
                }
                `}
            </style>
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
                        position={window.position}
                        onDrag={updateWindowPosition}
                        containerRef={containerRef}
                    />
                ))}
            </div>
        </div>
    );
};

const StyledWindow = ({ id, onClose, position, onDrag, containerRef }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);

    const handleDragStart = () => {
        setIsDragging(true);
        setIsAnimating(false);
    };

    const handleDragEnd = (event, info) => {
        setIsDragging(false);
        // ドラッグ終了後にアニメーションを再開するための遅延を設定
        setTimeout(() => {
            setIsAnimating(true);
        }, 1000); // 慣性移動が終わるまで待機
    };

    const handleDrag = (event, info) => {
        onDrag(id, { x: info.point.x, y: info.point.y });
    };

    return (
        <motion.div
            style={{ x: position.x, y: position.y, position: 'absolute' }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            drag
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={true}
        >
            <motion.div
                animate={
                    isAnimating
                        ? { y: [0, 20, 0] }
                        : false
                }
                transition={{ repeat: Infinity, duration: 5 }}
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
                            Position: X: {position.x.toFixed(0)}, Y: {position.y.toFixed(0)}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

StyledWindow.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    onDrag: PropTypes.func.isRequired,
    containerRef: PropTypes.object.isRequired,
};

export default WindowManager;
