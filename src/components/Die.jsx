const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      className="h-[50px] w-[50px] shadow-[0px_2px_2px_rgba(0,0,0,0.15)] flex justify-center items-center cursor-pointer rounded-[10px]"
      style={styles}
      onClick={props.holdDice}
    >
      <h2 className="text-[2rem]">{props.value}</h2>
    </div>
  );
};

export default Die;
