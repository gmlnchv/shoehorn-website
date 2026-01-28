type Mode = 'width' | 'height' | 'box';

export function initPlayground() {
    let mode: Mode = 'box';
    let minSize = 16;
    let maxSize = 512;
    const padding = 32; // p-8 = 2rem = 32px

    const resizable = document.querySelector('#resizable-container') as HTMLElement;
    const previewArea = document.querySelector('#playground-preview-area') as HTMLElement;
    const shoehornEl = document.querySelector('#shoehorn-el') as any;
    const minInput = document.querySelector('#min-size-input') as HTMLInputElement;
    const maxInput = document.querySelector('#max-size-input') as HTMLInputElement;
    const minVal = document.querySelector('#min-size-val') as HTMLElement;
    const maxVal = document.querySelector('#max-size-val') as HTMLElement;
    const modeButtons = document.querySelectorAll('#mode-buttons button');
    const modeDesc = document.querySelector('#mode-desc') as HTMLElement;

    // Initial positioning: Center the resizable container
    const centerResizable = () => {
        const parentRect = previewArea.getBoundingClientRect();
        const rect = resizable.getBoundingClientRect();
        const availableWidth = parentRect.width - padding * 2;
        const availableHeight = parentRect.height - padding * 2;
        resizable.style.left = `${padding + (availableWidth - rect.width) / 2}px`;
        resizable.style.top = `${padding + (availableHeight - rect.height) / 2}px`;
    };

    // Wait a bit for layout to settle or just call it
    setTimeout(centerResizable, 0);
    window.addEventListener('resize', centerResizable);

    const updateShoehorn = () => {
        shoehornEl.setAttribute('mode', mode);
        shoehornEl.setAttribute('min-size', minSize.toString());
        shoehornEl.setAttribute('max-size', maxSize.toString());
        if (typeof shoehornEl.fit === 'function') {
            shoehornEl.fit({ sync: true });
        }
    };

    // Mode handling
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            mode = btn.getAttribute('data-mode') as Mode;
            modeButtons.forEach(b => b.classList.remove('bg-foreground', 'text-background', 'border-foreground', 'shadow-lg'));
            modeButtons.forEach(b => b.classList.add('text-foreground/40', 'border-foreground/5'));
            btn.classList.add('bg-foreground', 'text-background', 'border-foreground', 'shadow-lg');
            btn.classList.remove('text-foreground/40', 'border-foreground/5');

            if (mode === 'width') modeDesc.innerText = 'Fits text to width (single line)';
            else if (mode === 'height') modeDesc.innerText = 'Fits text to height (single line)';
            else modeDesc.innerText = 'Fits text to both width & height (wrapped)';

            updateShoehorn();
        });
    });

    // Slider handling
    minInput.addEventListener('input', (e) => {
        minSize = parseInt((e.target as HTMLInputElement).value);
        minVal.innerText = `${minSize}px`;
        updateShoehorn();
    });

    maxInput.addEventListener('input', (e) => {
        maxSize = parseInt((e.target as HTMLInputElement).value);
        maxVal.innerText = `${maxSize}px`;
        updateShoehorn();
    });

    // 8-way Resize Logic (Anchored)
    let isResizing = false;
    let currentHandle: string | null = null;
    let startX: number, startY: number, startW: number, startH: number, startL: number, startT: number;

    const onMouseDown = (e: MouseEvent) => {
        const handle = (e.target as HTMLElement).closest('.handle');
        if (!handle) return;

        isResizing = true;
        currentHandle = Array.from(handle.classList).find(c => c !== 'handle') || null;
        startX = e.clientX;
        startY = e.clientY;

        const rect = resizable.getBoundingClientRect();
        const parentRect = previewArea.getBoundingClientRect();

        startW = rect.width;
        startH = rect.height;
        startL = rect.left - parentRect.left;
        startT = rect.top - parentRect.top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
        e.stopPropagation();
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isResizing || !currentHandle) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newW = startW;
        let newH = startH;
        let newL = startL;
        let newT = startT;

        const minW = 100;
        const minH = 50;

        const parentRect = previewArea.getBoundingClientRect();
        const maxW = parentRect.width - padding * 2;
        const maxH = parentRect.height - padding * 2;

        // East / West
        if (currentHandle.includes('e')) {
            newW = Math.min(maxW - (startL - padding), Math.max(minW, startW + dx));
        } else if (currentHandle.includes('w')) {
            // How much can we move left? To left padding.
            // Max dx we can move left is -(startL - padding).
            const clampedDx = Math.max(-(startL - padding), dx);
            newW = Math.max(minW, startW - clampedDx);
            if (newW > minW) {
                newL = startL + clampedDx;
            } else {
                newL = startL + (startW - minW);
            }
        }

        // North / South
        if (currentHandle.includes('s')) {
            newH = Math.min(maxH - (startT - padding), Math.max(minH, startH + dy));
        } else if (currentHandle.includes('n')) {
            const clampedDy = Math.max(-(startT - padding), dy);
            newH = Math.max(minH, startH - clampedDy);
            if (newH > minH) {
                newT = startT + clampedDy;
            } else {
                newT = startT + (startH - minH);
            }
        }

        resizable.style.width = `${newW}px`;
        resizable.style.height = `${newH}px`;
        resizable.style.left = `${newL}px`;
        resizable.style.top = `${newT}px`;

        if (typeof shoehornEl.fit === 'function') {
            shoehornEl.fit({ sync: true });
        }
    };

    const onMouseUp = () => {
        isResizing = false;
        currentHandle = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousedown', onMouseDown);

    // Initial sync
    updateShoehorn();
}
