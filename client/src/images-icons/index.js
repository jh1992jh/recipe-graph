import React from 'react';
import mainlogo from './icons/main-logo.svg'
import mainlogo2 from './icons/main-logo2.svg'
import knifeAndFork from './icons/knife-and-fork.svg';
import knifeAndForkLike from './icons/knife-and-fork-like.svg';
import knifeAndForkUnlike from './icons/knife-and-fork-unlike.svg';
import carouselImg1 from './images/carousel-img1.jpeg'
import carouselImg2 from './images/carousel-img2.jpeg'
import carouselImg3 from './images/carousel-img3.jpeg'
import carouselImg4 from './images/carousel-img4.jpeg'
;
import headerImg1 from './images/header-img2.jpg';

export const icons = {
    mainlogo,
    mainlogo2,
    knifeAndFork,
    knifeAndForkLike,
    knifeAndForkUnlike
}

export const carouselImgs = {
    carouselImg1,
    carouselImg2,
    carouselImg3,
    carouselImg4,
}

export const NavToggle = ({ toggleNav, show }) => (
    <svg className="nav-toggle" onClick={toggleNav} style={ show ? {display: 'none'} : null} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2" y="7" width="45" height="4" rx="1" fill="#abcef8"/>
<rect x="2" y="23" width="30" height="4" rx="1" fill="#abcef8"/>
<rect x="2" y="39" width="15" height="4" rx="1" fill="#abcef8"/>
</svg>
)

export default headerImg1;