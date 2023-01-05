import React from "react";
import './ArrowButtons.scss'

export function SampleNextArrow(props) {
    const { onClick, slideCount, currentSlide, slidesToShow } = props;

    return (
        <button
            className={slideCount - currentSlide === slidesToShow ? "section-next disabled" : "section-next"}
            onClick={onClick}
        >
            <i className='bx bx-chevron-right'></i>
        </button>
    );
}

export function SamplePrevArrow(props) {
    const { onClick, currentSlide } = props;
    return (
        <button
            className={currentSlide === 0 ? "section-prev disabled" : "section-prev"}
            onClick={onClick}
        >
            <i className='bx bx-chevron-left'></i>
        </button>
    );
}