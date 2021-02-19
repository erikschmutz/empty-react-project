export class ImageLoader {
    private image: HTMLImageElement;
    private ready = false;

    constructor(
        src: typeof import('*.svg'),
        public height: number,
        public width: number,
    ) {
        this.image = new Image();
        this.image.src = src.default;
        this.image.onload = () => {
            this.ready = true;
        };
    }

    getImage() {
        if (!this.ready) {
            throw new Error('not able to get src from unready image');
        }

        return this.image;
    }

    isReady() {
        return this.ready;
    }
}
