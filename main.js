const video = document.getElementById('myVideo');
const scrollArrow = document.querySelector('.scroll-arrow');
const pausePoints = [18, 27, 34, 43, 53, 62];
let currentPausePointIndex = 0;
let initialStart = true;
let wheelTimeout = null;
function hideAllPauseTexts() {
    document.querySelectorAll('.pause-text').forEach(text => {
        text.style.display = 'none';
    });
    scrollArrow.style.display = 'none';
}
function showPauseText(index) {
    hideAllPauseTexts();
    const textElement = document.getElementById(`pause-text-${index + 1}`);
    if (textElement) {
        textElement.style.display = 'block';
        scrollArrow.style.display = 'block';
    }
}
window.addEventListener('load', () => {
    video.pause();
    scrollArrow.style.display = 'block';
});
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        if (wheelTimeout) {
            clearTimeout(wheelTimeout);
        } 
        wheelTimeout = setTimeout(() => {
            if (video.paused) {
                hideAllPauseTexts();
                video.play();
                if (initialStart) {
                    initialStart = false;
                }
            }
        }, 50);
    }
});
video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    
    if (!initialStart && currentPausePointIndex < pausePoints.length) {
        if (Math.floor(currentTime) === pausePoints[currentPausePointIndex]) {
            video.pause();
            showPauseText(currentPausePointIndex);
            currentPausePointIndex++;
        }
    }
});
video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.pause();
    currentPausePointIndex = 0;
    initialStart = true;
    hideAllPauseTexts();
    scrollArrow.style.display = 'block';
});