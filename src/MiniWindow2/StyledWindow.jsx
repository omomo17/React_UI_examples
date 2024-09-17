import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { RiSearchEyeLine } from 'react-icons/ri';

const StyledWindow = ({
    id,
    onClose,
    position,
    onDrag,
    containerRef,
    onImageClick,
}) => {
    const [isAnimating, setIsAnimating] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

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

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
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
                animate={isAnimating ? { y: [0, 20, 0] } : false}
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
                        <div
                            className="image-container relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => onImageClick(id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={`https://picsum.photos/id/${id + 10}/250/150`}
                                alt={`Sample ${id}`}
                                style={{ width: '100%', borderRadius: '4px' }}
                            />
                            {isHovered && (
                                <div
                                    className="overlay absolute inset-0 flex items-center justify-center"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <RiSearchEyeLine size={48} color="#000" />
                                </div>
                            )}
                        </div>
                        <div
                            className="footer bg-purple-700 text-white p-2 mt-2 rounded-b-md"
                            style={{
                                borderBottomLeftRadius: '6px',
                                borderBottomRightRadius: '6px',
                            }}
                        >
                            <h2 className="text-lg">Image Caption {id}</h2>
                            <p className="text-sm">
                                This is a brief description for image {id}.
                            </p>
                        </div>
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
    onImageClick: PropTypes.func.isRequired,
};

export default StyledWindow;
