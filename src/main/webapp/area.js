const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const fillStyle = '#8c8c8c';

const oneCell = canvas.width / 12;
const halfCell = oneCell / 2;

const startX = canvas.width / 2;
const startY = canvas.height / 2;
const line = (r) => (r<3?2:5);

function drawAxis() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawGrid() {
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += oneCell) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = 'lightgray';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += oneCell) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = 'lightgray';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function drawCircle(r) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.fillStyle = fillStyle;
    ctx.arc(startX, startY, r*oneCell, Math.PI * 0.5, Math.PI, false);
    ctx.closePath();
    ctx.fill();
}

function drawRect(r) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.fillStyle = fillStyle;
    ctx.rect(startX, startY, -r*halfCell, -r*oneCell);
    ctx.closePath();
    ctx.fill();

}

function drawTriangle(r) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.fillStyle = fillStyle;
    ctx.lineTo(startX + r*halfCell, startY);
    ctx.lineTo(startX, startY - r*halfCell);
    ctx.closePath();
    ctx.fill();
}

function drawCoords(r) {
    ctx.fillStyle = 'black';
    ctx.font = `${r<=2 ? 0.65 : 1}em Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('R/2', startX + r*halfCell, startY - r*2);
    ctx.beginPath();
    ctx.moveTo(startX + r*halfCell, startY - line(r));
    ctx.lineTo(startX + r*halfCell, startY + line(r));
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();
    ctx.fillText('R', startX + r*oneCell, startY - r*2);
    ctx.beginPath();
    ctx.moveTo(startX + r*oneCell, startY - line(r));
    ctx.lineTo(startX + r*oneCell, startY + line(r));
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    ctx.fillText('-R/2', startX , startY + r*halfCell);
    ctx.beginPath();
    ctx.moveTo(startX - line(r), startY + r*halfCell);
    ctx.lineTo(startX + line(r), startY + r*halfCell);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();
    ctx.fillText('-R', startX, startY + r*oneCell);
    ctx.beginPath();
    ctx.moveTo(startX - line(r), startY + r*oneCell);
    ctx.lineTo(startX + line(r), startY + r*oneCell);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillText('-R/2', startX - r*halfCell, startY - r*2);
    ctx.moveTo(startX - r*halfCell, startY - line(r));
    ctx.lineTo(startX - r*halfCell, startY + line(r));
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillText('-R', startX - r*oneCell, startY - r*2);
    ctx.moveTo(startX - r*oneCell, startY - line(r));
    ctx.lineTo(startX - r*oneCell, startY + line(r));
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillText('R/2', startX, startY - r*halfCell);
    ctx.moveTo(startX - line(r), startY - r*halfCell);
    ctx.lineTo(startX + line(r), startY - r*halfCell);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillText('R', startX, startY - r*oneCell);
    ctx.moveTo(startX + line(r), startY - r*oneCell);
    ctx.lineTo(startX - line(r), startY - r*oneCell);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();
}
function redrawPoints(r) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    points.forEach(point => {
        const pixelX = startX + (point.x * (canvas.width / 12)/point.r*r);
        const pixelY = startY - (point.y * (canvas.height / 12)/point.r*r);
        ctx.fillStyle = point.status ? '#A5D6A7' : '#E57373';
        ctx.beginPath();
        ctx.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    });
}

const R = document.querySelectorAll('input[type="checkbox"]');

R.forEach((r) => r.addEventListener('click', () => {
    R.forEach((checkbox) => {
        if (checkbox !== r) {
            checkbox.checked = false;
        }
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    if (r.checked) {
        drawCircle(r.value);
        drawRect(r.value);
        drawTriangle(r.value);
        drawCoords(r.value);
        redrawPoints(r.value);
    }
    drawAxis();
}));
drawGrid();
drawAxis();


