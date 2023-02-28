(function () {

    function eventPromise(event) {
        return new Promise((res, rej) => {
            this.addEventListener(event, res);
        });
    }
    Object.defineProperty(Object.prototype, 'eventPromise', { value: eventPromise });

    function setTimeoutPromise(delay) {
        return new Promise((res, rej) => {
            setTimeout(res, delay);
        })
    }
    Object.defineProperty(window, 'setTimeoutPromise', { value: setTimeoutPromise });
})();


async function waitForClick() {
    const clickElement = document.getElementById('clickMe');
    console.log('awaiting click');
    await clickElement.eventPromise('click');
    console.log('awaited click happened now');
}


function logOnResize(e) {
    console.log(`Element resized: ${e.target.offsetWidth}, ${e.target.offsetHeight}`);
    e.target.eventPromise('customResize').then(logOnResize);
}


window.eventPromise('load').then(() => {

    const clickElement = document.getElementById('clickMe');
    clickElement.eventPromise('click').then(e => console.log('Button clicked'));
    waitForClick();


    const resizeElement = document.getElementById('resizeMe');
    const customResize = new Event('customResize');
    const resObs = new ResizeObserver((e) => resizeElement.dispatchEvent(customResize)).observe(resizeElement);

    resizeElement.eventPromise('customResize').then(logOnResize);


    setTimeoutPromise(2000).then(() => {
        const timeoutElement = document.getElementById('timeoutMe');
        timeoutElement.innerText = 'Timeout fired';
        console.log('Timeout fired');
    });
});