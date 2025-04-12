import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import img from '../../assets/co_30_04.svg';
import img1 from '../../assets/vn_flag.png';

const FlagConfetti: React.FC = () => {
  const flagImage = new Image();
  flagImage.src = img;

  const flagImage1 = new Image();
  flagImage1.src = img1;

  const [wind, setWind] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setWind((Math.random() - 0.5) * 0.2); // từ -0.1 đến 0.1
  }, 1000); // đổi hướng mỗi giây

  return () => clearInterval(interval);
}, []);

  return (
    <>

      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={7}
        drawShape={(ctx) => {
          ctx.drawImage(flagImage, -10, -10, 40, 20);
        }}
        gravity={0.1}
        opacity={0.7}
        wind={wind}
        
      />

      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={8}
        drawShape={(ctx) => {
          ctx.drawImage(flagImage1, -10, -10, 40, 20);
        }}
        gravity={0.1}
        opacity={0.7}
        wind={wind}
      />
    </>
  );
};

export default FlagConfetti;
