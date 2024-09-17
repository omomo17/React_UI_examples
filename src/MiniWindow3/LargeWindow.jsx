import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const LargeWindow = ({ id, onClose, position, onDrag, containerRef }) => {
    const [isAnimating, setIsAnimating] = useState(true);
    const [initialY, setInitialY] = useState(0);

    useEffect(() => {
        // 各ウインドウにランダムな開始位置を設定（0～20の範囲）
        const randomY = Math.random() * 20;
        setInitialY(randomY);
    }, []);

    const handleDragStart = () => {
        setIsAnimating(false);
    };

    const handleDragEnd = () => {
        setTimeout(() => {
            setIsAnimating(true);
        }, 1000);
    };

    const handleDrag = (event, info) => {
        onDrag(id, { x: info.point.x, y: info.point.y });
    };

    return (
        <motion.div
            style={{ x: position.x, y: position.y, position: 'absolute', zIndex: 100 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            drag
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={true}
        >
            <motion.div
                initial={{ y: initialY }}
                animate={
                    isAnimating
                        ? { y: [initialY, initialY + 20, initialY] }
                        : false
                }
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: 'easeInOut',
                }}
            >
                <div
                    className="window-container relative border border-purple-700 rounded-md"
                    style={{ width: '600px', borderWidth: '2px' }}
                >
                    {/* タブ部分 */}
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
                    {/* コンテンツ部分 */}
                    <div
                        className="window-content p-4 bg-white rounded-b-md"
                        style={{
                            borderBottomLeftRadius: '6px',
                            borderBottomRightRadius: '6px',
                        }}
                    >
                        <img
                            src={`https://picsum.photos/id/${id + 10}/500/300`}
                            alt={`Sample Large ${id}`}
                            style={{ width: '100%', borderRadius: '4px' }}
                        />
                        <div className="description mt-4">
                            <h2 className="text-xl">Detailed Description {id}</h2>
                            <p className="text-md">
                                This is a detailed description for image {id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

LargeWindow.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    onDrag: PropTypes.func.isRequired,
    containerRef: PropTypes.object.isRequired,
};

export default LargeWindow;
