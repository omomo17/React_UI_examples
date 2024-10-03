const App = () => {
    return (
      <div className="relative">
        <div className="h-screen bg-pastel-pink skew-y-12 relative z-50 -mt-96" />
        <div className="h-screen bg-pastel-blue -skew-y-12 relative z-40 -mt-96" />
        <div className="h-screen bg-pastel-green skew-y-12 relative z-30 -mt-96" />
        <div className="h-screen bg-pastel-yellow -skew-y-12 relative z-20 -mt-96" />
        <div className="h-screen bg-pastel-purple relative z-10 -mt-96" />
      </div>
    );
  };
  
  export default App;









// const App = () => {
//     return (
//       <div className="flex flex-col">
//         <div className="h-screen bg-pastel-pink" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }} />
//         <div className="h-screen bg-pastel-blue" style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)' }} />
//         <div className="h-screen bg-pastel-green" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }} />
//         <div className="h-screen bg-pastel-yellow" style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)' }} />
//         <div className="h-screen bg-pastel-purple"/>
//       </div>
//     );
//   };
  
//   export default App;










// const App = () => {
//     return (
//       <div className="flex flex-col">
//         {/* ピンク -> ブルー */}
//         <div
//           className="h-screen bg-pastel-pink"
//           style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
//         />
//         {/* ブルー -> グリーン */}
//         <div
//           className="h-screen bg-pastel-blue"
//           style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)' }}
//         />
//         {/* グリーン -> イエロー */}
//         <div
//           className="h-screen bg-pastel-green"
//           style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
//         />
//         {/* イエロー -> パープル */}
//         <div
//           className="h-screen bg-pastel-yellow"
//           style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)' }}
//         />
//         {/* パープル */}
//         <div
//           className="h-screen bg-pastel-purple"
//           style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
//         />
//       </div>
//     );
//   };
  
//   export default App;