import * as d3 from "d3";
import { useState, useEffect, useMemo, useRef, MouseEvent } from "react";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useTokenSale } from "@/store/tokenSale";

import "@/assets/css/home/sale.css";

const MARGIN = {
    top: 16,
    right: 8,
    bottom: 48,
    left: 64,
};

interface DotItemProps {
    radius: number;
}

const DotItem: React.FC<DotItemProps> = ({ radius }) => {
    return (
        <div className="dot-item">
            <div
                className="outer-ring"
                style={{ width: `${2 * radius}px`, height: `${2 * radius}px` }}
            />
            <div
                className="inner-ring"
                style={{ width: `${radius}px`, height: `${radius}px` }}
            />
        </div>
    );
};

interface SaleGraphProps {
    width: number;
    height: number;
}

interface DataPoint {
    x: number;
    y: number;
}

const SaleGraph: React.FC<SaleGraphProps> = ({ width, height }) => {
    const screenWidth = useScreenWidth();
    const textSize = screenWidth < 425 ? "10px" : width < 1024 ? "14px" : "16px";
    const { totalSold, tokenPrice } = useTokenSale();

    const [hoverX, setHoverX] = useState<number | null>(null);
    const [hoverY, setHoverY] = useState<number | null>(null);

    const computeY = (x: number): number => 0.085 + 0.165 * (1 - Math.pow(1 - x / 100, 3));

    const decorate_line = useMemo<DataPoint[]>(() => {
        const newData: DataPoint[] = [];
        for (let xValue = 0; xValue <= 100; xValue++) {
            newData.push({ x: xValue, y: computeY(xValue) });
        }
        return newData;
    }, []);

    const decorate_area = useMemo<DataPoint[]>(() => {
        const newData: DataPoint[] = [];
        const maxX = Number(totalSold) / 1_000_000;
        for (let xValue = 0; xValue <= maxX; xValue++) {
            newData.push({ x: xValue, y: computeY(xValue) });
        }
        return newData;
    }, [totalSold]);

    const axesRef = useRef<SVGGElement>(null);
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const yScale = useMemo(() =>
        d3.scaleLinear().domain([0, 0.33]).range([boundsHeight, 0]),
        [boundsHeight]
    );

    const xMax = d3.max(decorate_line, (d) => d.x) ?? 100;
    const xScale = useMemo(() =>
        d3.scaleLinear().domain([0, xMax]).range([0, boundsWidth]),
        [boundsWidth, xMax]
    );

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
        const mouseX = event.clientX - rect.left - MARGIN.left;

        if (mouseX <= boundsWidth && mouseX >= 0) {
            const xValue = xScale.invert(mouseX);
            const yValue = computeY(xValue);
            setHoverX(mouseX);
            setHoverY(yScale(yValue));
        } else {
            setHoverX(null);
            setHoverY(null);
        }
    };

    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();

        const axisPadding = screenWidth > 425 ? 8 : 4;

        const xAxisGenerator = d3.axisBottom(xScale)
            .tickSize(-boundsHeight)
            .tickPadding(axisPadding)
            .tickValues(d3.range(0, 101, 10));

        const xAxis = svgElement
            .append("g")
            .attr("transform", `translate(0,${boundsHeight})`)
            .call(xAxisGenerator);

        xAxis.selectAll("path").style("stroke", "#0C4A6E11");
        xAxis.selectAll("line").style("stroke", (d: any) => d === 0 ? "#0C4A6E" : "#0C4A6E11");
        xAxis.selectAll("text")
            .style("stroke", "none")
            .style("fill", "#0C4A6E")
            .style("font-size", screenWidth < 425 ? "8px" : "12px");

        const yAxisGenerator = d3.axisLeft(yScale)
            .tickSize(-boundsWidth)
            .tickPadding(axisPadding)
            .tickValues([0.05, 0.1, 0.15, 0.2, 0.25, 0.3]);

        const yAxis = svgElement.append("g").call(yAxisGenerator);

        yAxis.selectAll("path").style("stroke", "#0C4A6E11");
        yAxis.selectAll("line").style("stroke", (d: any) => d === 0 ? "#0C4A6E" : "#0C4A6E11");
        yAxis.selectAll("text")
            .style("stroke", "none")
            .style("fill", "#0C4A6E")
            .style("font-size", screenWidth < 425 ? "8px" : "12px");

        const textX = screenWidth < 425 ? -32 : -52;
        const textY = screenWidth < 425 ? boundsHeight + 28 : width < 768 ? boundsHeight + 36 : boundsHeight + 44;

        svgElement.append("text")
            .attr("x", boundsWidth / 2)
            .attr("y", textY)
            .attr("text-anchor", "middle")
            .attr("stroke", "none")
            .attr("fill", "#0C4A6E")
            .attr("font-size", textSize)
            .text("Tokens Sold (Millions)");

        svgElement.append("text")
            .attr("x", -boundsHeight / 2)
            .attr("y", textX)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("stroke", "none")
            .attr("fill", "#0C4A6E")
            .attr("font-size", textSize)
            .text("Current Price");
    }, [xScale, yScale, boundsHeight, boundsWidth, screenWidth, textSize]);

    const linePath = d3.line<DataPoint>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))(decorate_line);

    const areaPath = d3.area<DataPoint>()
        .x((d) => xScale(d.x))
        .y1((d) => yScale(d.y))
        .y0(yScale(0))(decorate_area);

    if (!linePath || !areaPath) return <div>No data to display</div>;

    const _x_decorate = xScale(Number(totalSold) / 1_000_000);
    const _y_decorate = yScale(computeY(Number(totalSold) / 1_000_000));

    return (
        <div
            className="hover:cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                setHoverX(null);
                setHoverY(null);
            }}
        >
            <svg height={height} className="w-full relative">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0C4A6E" stopOpacity="0.7" />
                        <stop offset="80%" stopColor="#020202" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                    <path d={linePath} stroke="#0C4A6EEE" fill="none" strokeWidth={2.5} />
                    <path d={areaPath} fill="url(#lineGradient)" fillOpacity={0.5} strokeWidth={1} />
                </g>
                <g ref={axesRef} transform={`translate(${MARGIN.left},${MARGIN.top})`} stroke="#0C4A6E" />
                <rect width={boundsWidth} height={boundsHeight} fill="transparent" />
                {hoverX !== null && hoverY !== null && hoverX > 0 &&
                    <g>
                        <circle cx={hoverX + MARGIN.left} cy={hoverY + MARGIN.top} r={5} fill="#0C4A6ECC" />
                        <line
                            x1={hoverX + MARGIN.left}
                            x2={hoverX + MARGIN.left}
                            y1={MARGIN.top}
                            y2={boundsHeight + MARGIN.top}
                            stroke="#0C4A6E"
                            strokeWidth={1}
                            strokeDasharray="5,5"
                        />
                        <line
                            x1={MARGIN.left}
                            x2={boundsWidth + MARGIN.left}
                            y1={hoverY + MARGIN.top}
                            y2={hoverY + MARGIN.top}
                            stroke="#0C4A6E"
                            strokeWidth={1}
                            strokeDasharray="5,5"
                        />
                    </g>
                }
            </svg>
            {hoverX !== null && hoverY !== null && hoverX > 0 && (
                <div
                    className="hover-item"
                    style={{
                        left: `${MARGIN.left + hoverX}px`,
                        top: `${MARGIN.top + hoverY}px`,
                        transform:
                            hoverX > xScale(60)
                                ? "translate(-112.5%, 12.5%)"
                                : hoverX < xScale(15)
                                    ? "translate(12.5%, -112.5%)"
                                    : "translate(-50%, -112.5%)",
                    }}
                >
                    <p className="hover-label">Presale Price:</p>
                    <p className="hover-value">
                        {computeY(xScale.invert(hoverX)).toFixed(6)}
                    </p>
                </div>
            )}
            <div
                className="flex flex-row items-center absolute"
                style={{
                    left: `${MARGIN.left + _x_decorate}px`,
                    top: `${MARGIN.top + _y_decorate}px`,
                    transform: "translate(-50%, -50%)",
                }}
            >
                <DotItem radius={8} />
                <p className={`absolute left-6 text-sky-950 font-semibold ${width < 425 ? "text-2xs" : "text-sm"}`}>
                    {tokenPrice}
                </p>
            </div>
        </div>
    );
};

const SaleChart: React.FC = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const screenWidth = useScreenWidth();
    const [parentWidth, setParentWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (parentRef.current) {
                setParentWidth(parentRef.current.offsetWidth);
            }
        };
        updateWidth();

        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return (
        <div className="relative xy-center w-full max-[425px]:-mx-3 max-[425px]:mt-2">
            <div ref={parentRef} className="w-full">
                <SaleGraph
                    width={parentWidth}
                    height={screenWidth > 768 ? parentWidth / 3 : parentWidth / 2}
                />
            </div>
        </div>
    );
};

export default SaleChart;
