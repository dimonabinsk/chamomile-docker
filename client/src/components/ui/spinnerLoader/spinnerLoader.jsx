const SpinnerLoader = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center align-super">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SpinnerLoader;
