import React, { useEffect, useState } from 'react';

const ColorfulText: React.FC = () => {
  const [text, setText] = useState<string>('Trợ giúp: H.Đăng (0912767638)');

  useEffect(() => {
    const farbbibliothek = [
      ["#FF0000","#FF1100","#FF2200","#FF3300","#FF4400","#FF5500","#FF6600","#FF7700","#FF8800","#FF9900","#FFaa00","#FFbb00","#FFcc00","#FFdd00","#FFee00","#FFff00","#FFee00","#FFdd00","#FFcc00","#FFbb00","#FFaa00","#FF9900","#FF8800","#FF7700","#FF6600","#FF5500","#FF4400","#FF3300","#FF2200","#FF1100"],
      ["#FF0000","#FF4000","#FF8000","#FFC000","#FFFF00","#C0FF00","#80FF00","#40FF00","#00FF00","#00FF40","#00FF80","#00FFC0","#00FFFF","#00C0FF","#0080FF","#0040FF","#0000FF","#4000FF","#8000FF","#C000FF","#FF00FF","#FF00C0","#FF0080","#FF0040"],
      ["#FF0000","#EE0000","#DD0000","#CC0000","#BB0000","#AA0000","#990000","#880000","#770000","#660000","#550000","#440000","#330000","#220000","#110000","#000000","#110000","#220000","#330000","#440000","#550000","#660000","#770000","#880000","#990000","#AA0000","#BB0000","#CC0000","#DD0000","#EE0000"]
    ];

    let colors: string[] = farbbibliothek[0];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % farbbibliothek.length;
      colors = farbbibliothek[currentIndex];
      farbschrift();
    }, 10);

    function farbschrift() {
      const spans = document.querySelectorAll('.marquee-content span');
      spans.forEach((span: any, index) => {
        span.style.color = colors[index % colors.length];
      });
    }

    farbschrift();

    return () => clearInterval(intervalId);
  }, []);

  return (
      <div className="marquee-content" style={{ fontSize: 30, padding: '20px 30px', textAlign: 'center' }}>
        {text.split('').map((char, index) => (
          <span key={index} className={`a${index}`}>
            {char}
          </span>
        ))}
      </div>
  );
};

export default ColorfulText;
