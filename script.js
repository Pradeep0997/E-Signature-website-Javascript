// scripts.js
function generateSignature() {
    const signature = document.getElementById('signature').value;
    const fontStyle = document.getElementById('fontStyle').value;
    const fontSize = document.getElementById('fontSize').value;
    const fontColor = document.getElementById('fontColor').value;
    const fontSlope = document.getElementById('fontSlope').value;

    const signatureOutput = document.getElementById('signatureOutput');
    signatureOutput.style.fontFamily = fontStyle;
    signatureOutput.style.fontSize = fontSize + 'px';
    signatureOutput.style.color = fontColor;
    signatureOutput.style.transform = `skewX(${fontSlope}deg)`;
    signatureOutput.textContent = signature;
}

function downloadSignature() {
    const svg = document.getElementById('signatureOutput');
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'signature.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


//Canvas
document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('signature-pad');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var strokes = [];

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    });

    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
            ctx.stroke();
        }
    });



    canvas.addEventListener('mouseup', function () {
        if (drawing) {
            drawing = false;
            strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
    });

    document.getElementById('clear-button').addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes = [];
    });

    document.getElementById('undo-button').addEventListener('click', function () {
        if (strokes.length > 0) {
            ctx.putImageData(strokes.pop(), 0, 0);
        }
    });

    document.getElementById('download-button').addEventListener('click', function () {
        var dataURL = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });
});