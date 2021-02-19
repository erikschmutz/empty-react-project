import { useEffect, useRef, useState } from 'react';
import { ImageLoader } from 'src/utils/Image';

export default function Movie() {
    const [init, setInit] = useState(false);
    const ref = useRef<HTMLCanvasElement>(null);

    const draw = async (
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
    ) => {
        const rocket = new ImageLoader(
            await import('src/assets/rocket.svg'),
            50,
            50,
        );
        const stone = new ImageLoader(
            await import('src/assets/stone.svg'),
            30,
            30,
        );

        let frame = 0;
        const fps = 25;
        let rocks: { x: number; y: number }[] = [];

        setInterval(async () => {
            if (!rocket.isReady() || !rocket.isReady()) return;
            frame++;

            let d1 = frame / 5;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();

            const dy = (canvas.height - rocket.height / 2) / 2;
            const dx = (canvas.width - rocket.width / 2) / 2;
            const dr = Math.sin(d1) / 5;

            ctx.translate(dx, dy);
            ctx.rotate(Math.PI / 4);

            ctx.rotate(dr);
            ctx.drawImage(
                rocket.getImage(),
                -rocket.width / 2,
                -rocket.height / 2,
                rocket.width,
                rocket.height,
            );

            ctx.restore();

            for (const rock of rocks) {
                ctx.save();
                ctx.translate(rock.x, rock.y + Math.sin(frame % 3) * 2);
                ctx.rotate(frame / 50);
                ctx.drawImage(
                    stone.getImage(),
                    0,
                    0,
                    stone.width,
                    stone.height,
                );
                ctx.restore();
                rock.x = rock.x - 3;
            }

            if (Math.random() < 0.01) {
                rocks.push({
                    x: canvas.width,
                    y: Math.random() * canvas.height,
                });
                rocks = rocks
                    .filter((v) => v.x > 0)
                    .filter((v) => Math.abs(v.y - canvas.width / 2) > 30);
            }
        }, 1000 / fps);
    };

    useEffect(() => {
        const canvas = ref.current;
        if (canvas && !init) {
            const ctx = canvas.getContext('2d');

            if (!ctx) {
            } else {
                draw(ctx, canvas);
                setInit(true);
            }
        }
    }, [init]);

    return (
        <>
            <div className="flex border-blue-600 border rounded">
                <canvas
                    ref={ref}
                    id="my-house"
                    width="300"
                    className="m-auto"
                    height="300"
                />
            </div>
            <div className="flex m-10">
                <div className="m-auto text-gray-500">
                    Icons made by{' '}
                    <a href="https://www.freepik.com" title="Freepik">
                        Freepik
                    </a>{' '}
                    from{' '}
                    <a href="https://www.flaticon.com/" title="Flaticon">
                        www.flaticon.com
                    </a>
                </div>
            </div>
        </>
    );
}
