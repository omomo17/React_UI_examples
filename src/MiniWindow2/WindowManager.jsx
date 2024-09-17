import { useState, useRef } from 'react';
import StyledWindow from './StyledWindow';
import LargeWindow from './LargeWindow';

const WindowManager = () => {
    const [windows, setWindows] = useState([]);
    const [windowCount, setWindowCount] = useState(0);
    const [largeWindows, setLargeWindows] = useState([]);
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

    const openLargeWindow = (id) => {
        const newLargeWindow = {
            id,
            position: { x: 100, y: 100 },
        };
        setLargeWindows((prevWindows) => [...prevWindows, newLargeWindow]);
    };

    const closeLargeWindow = (id) => {
        setLargeWindows((prevWindows) =>
            prevWindows.filter((window) => window.id !== id)
        );
    };

    const updateLargeWindowPosition = (id, position) => {
        setLargeWindows((prevWindows) =>
            prevWindows.map((window) =>
                window.id === id ? { ...window, position } : window
            )
        );
    };

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
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
                        onImageClick={openLargeWindow}
                    />
                ))}
                {largeWindows.map((window) => (
                    <LargeWindow
                        key={`large-${window.id}`}
                        id={window.id}
                        onClose={closeLargeWindow}
                        position={window.position}
                        onDrag={updateLargeWindowPosition}
                        containerRef={containerRef}
                    />
                ))}
            </div>
        </div>
    );
};

export default WindowManager;