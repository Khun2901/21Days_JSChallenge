(() => {
  // เริ่มเขียนโค้ด
  const canvas = document.getElementById('painting');
  // console.log(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const context = canvas.getContext('2d');

  let previousPoint =  { x: 0, y: 0 };
  let rgbStyle = {r: 222, g: 10, b: 109};

  function getDistance(previousPoint, currentPoint) {
    return Math.sqrt((previousPoint.x - currentPoint.x)**2 + (previousPoint.y - currentPoint.y)**2);
  }

  function onMouseMove({pageX, pageY}) {
    const currentPoint = {x: pageX, y: pageY};
    const distance = getDistance(previousPoint, currentPoint);
    const opacity = Math.min(0.2, (1 / (distance+0.01)));

    context.beginPath();

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = Math.min(20, 1 / (distance+0.001) * 20);
    context.strokeStyle = `rgba(${rgbStyle.r}, ${rgbStyle.g}, ${rgbStyle.b}, ${opacity})`;

    context.moveTo(previousPoint.x, previousPoint.y);
    context.lineTo(currentPoint.x, currentPoint.y);
    context.stroke();
    context.closePath();

    previousPoint = currentPoint;
  }

  function onMouseEnter({pageX, pageY}) {
    previousPoint.x = pageX;
    previousPoint.y = pageY;
  }

  function onMouseClick() {
    // console.log('clicked');
    rgbStyle.r = Math.floor(Math.random() * 255);
    rgbStyle.g = Math.floor(Math.random() * 255);
    rgbStyle.b = Math.floor(Math.random() * 255);
    console.log(rgbStyle);
  }

  function run() {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseenter', onMouseEnter);  
    canvas.addEventListener('click', onMouseClick);  
  }

  run();

})();
