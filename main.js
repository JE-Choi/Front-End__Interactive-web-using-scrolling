(() => {
    const actions = {
        birdFlies(key) {
            if (key) {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key) {
            if (key) {
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, -${window.innerHeight * 0.7}px)`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    }

    const appendDataIdx = (array) => {
        array.forEach((data, idx) => {
            data.dataset.index = idx;
        });
    }
    const setActivate = (elem, isActive, action) => {
        if (!elem) {
            return;
        }
        isActive ? elem.classList.add('visible') : elem.classList.remove('visible');

        if (action) {
            actions[action](isActive);
        }
    }

    /////////////////////
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    appendDataIdx(stepElems);
    appendDataIdx(graphicElems);


    let ioIndex;
    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = Number(entries[0].target.dataset.index);  // 감지되고 있는
    });
    stepElems.forEach((ele) => {
        io.observe(ele);
    });

    let currentItem = graphicElems[0]; // 현재 활성화된 (.visible 붙은)
    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            if (!stepElems[i]) {
                continue;
            }
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();
            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) { // 범위 설정
                setActivate(currentItem, false, currentItem.dataset.action);
                currentItem = graphicElems[step.dataset.index];
                setActivate(currentItem, true, currentItem.dataset.action);
            }
        }
    });
    setActivate(currentItem, true);

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    }, false);
})();