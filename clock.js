window.onload = () => {
    let canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    setInterval(() => {
        draw();
    }, 200);
}

var draw = () => {
    clearCanvas();
    // context.beginPath();
    drawClock();
    // context.closePath();
}

var clearCanvas = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
}

var drawClock = () => {
    let time = new Date();
    let angles = getAngles(time);
    let x = width / 2;
    let y = height / 2;
    let rs = Math.min(x, y) / 1.5;
    let scolor = { red: 255, green: 240 - 4 * time.getSeconds(), blue: 240 - 4 * time.getSeconds() };
    let mcolor = { red: 240 - 4 * time.getMinutes(), green: 240 - 4 * time.getMinutes(), blue: 255 };
    let hcolor = { red: 240 - 12 * time.getHours(), green: 255, blue: 240 - 12 * time.getHours() };
    context.lineWidth = 8;
    drawArc(x, y, rs, angles.second, toColorString(scolor));
    drawArc(x, y, rs - 10, angles.minute, toColorString(mcolor));
    drawArc(x, y, rs - 20, angles.hour, toColorString(hcolor));
}

var getAngles = (time) => {
    let h = time.getHours();
    h = h > 12 ? h - 12 : h;
    let m = time.getMinutes();
    let s = time.getSeconds();
    return { hour: ((h * 3600 + m * 60) / 43200) * 2 * Math.PI, minute: ((m * 60 + s) / 3600) * 2 * Math.PI, second: ((s) / 60) * 2 * Math.PI };
}

var drawArc = (x, y, r, angle, strokeStyle) => {
    context.strokeStyle = strokeStyle;
    context.beginPath();
    context.moveTo(x, y - r);
    let startAngle = -Math.PI / 2;
    context.arc(x, y, r, startAngle, startAngle + angle);
    context.stroke();
    context.closePath();
}

var toColorString = (() => {
    let toHex = (value) => {
        if (value < 0) value = 0;
        if (value > 255) value = 255;
        let string = value.toString(16);
        if (string.length === 1) return `0${string}`;
        return string;
    }
    return (color) => `#${toHex(color.red)}${toHex(color.green)}${toHex(color.blue)}`;
})();