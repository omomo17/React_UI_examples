const App = () => {
    return (
      <div className="relative">
        <div className="h-[1500px] bg-pastel-pink skew-y-12 relative z-50 -mt-[500px]"/>
        <div className="h-[2500px] bg-pastel-blue -skew-y-12 relative z-40 -mt-[800px]" />
        <div className="h-[2500px] bg-pastel-green skew-y-12 relative z-30 -mt-[800px]" />
        <div className="h-[2500px] bg-pastel-yellow -skew-y-12 relative z-20 -mt-[800px]" />
        <div className="h-[2500px] bg-pastel-purple relative z-10 -mt-[500px]" />
      </div>
    );
  };
  
  export default App;

  //TODO:デバイスごとに適切な高さに変更する
  /*
  sample:
  sm、md、lg、xl、2xl
  h-[1000px] md:h-[1500px]
  */
