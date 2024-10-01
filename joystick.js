const joystickButton = document.getElementById('joystick-button');
let isDragging = false;
let startX, startY;

const maxDistance = 50;  // maximum distance the joystick can move
let direction = { x: 0, y: 0 };  // initial direction

joystickButton.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    // Reset joystick to the center
    joystickButton.style.transform = 'translate(-50%, -50%)';
    direction = { x: 0, y: 0 };
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance < maxDistance) {
            joystickButton.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            direction.x = deltaX / maxDistance;
            direction.y = deltaY / maxDistance;
        } else {
            const angle = Math.atan2(deltaY, deltaX);
            const limitX = maxDistance * Math.cos(angle);
            const limitY = maxDistance * Math.sin(angle);
            joystickButton.style.transform = `translate(${limitX}px, ${limitY}px)`;
            direction.x = limitX / maxDistance;
            direction.y = limitY / maxDistance;
        }
    }
});

joystickButton.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

document.addEventListener('touchend', () => {
    isDragging = false;
    joystickButton.style.transform = 'translate(-50%, -50%)';
    direction = { x: 0, y: 0 };
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance < maxDistance) {
            joystickButton.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            direction.x = deltaX / maxDistance;
            direction.y = deltaY / maxDistance;
        } else {
            const angle = Math.atan2(deltaY, deltaX);
            const limitX = maxDistance * Math.cos(angle);
            const limitY = maxDistance * Math.sin(angle);
            joystickButton.style.transform = `translate(${limitX}px, ${limitY}px)`;
            direction.x = limitX / maxDistance;
            direction.y = limitY / maxDistance;
        }
    }
});
