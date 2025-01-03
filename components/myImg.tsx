'use client';

export const PlaceHolderImg = ({width,height}: {width: number,height: number}) => {

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width={width} height={height} fill="#E6E6ED"/>
            <path d="M99.8334 83C99.8334 72.5505 99.8334 67.3258 103.08 64.0796C106.326 60.8333 111.551 60.8333 122 60.8333C132.45 60.8333 137.674 60.8333 140.92 64.0796C144.167 67.3258 144.167 72.5505 144.167 83C144.167 93.4495 144.167 98.6742 140.92 101.92C137.674 105.167 132.45 105.167 122 105.167C111.551 105.167 106.326 105.167 103.08 101.92C99.8334 98.6742 99.8334 93.4495 99.8334 83Z" stroke="white" stroke-width="3"/>
            <circle cx="132.5" cy="72.5" r="3.5" stroke="white" stroke-width="3"/>
            <path d="M131.333 106.333C129.888 101.141 126.514 96.4917 121.712 93.1131C116.534 89.4702 110.034 87.5421 103.37 87.6729C102.579 87.6711 101.788 87.6963 101 87.7485" stroke="white" stroke-width="3" stroke-linejoin="round"/>
            <path d="M124.333 97C128.304 93.9045 132.581 92.3164 136.901 92.3335C139.351 92.3309 141.79 92.8505 144.167 93.8773" stroke="white" stroke-width="3" stroke-linejoin="round"/>
        </svg>
    )
}