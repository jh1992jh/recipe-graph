import React, { Component } from 'react'

class Carousel extends Component {
    state = {
        images: [],
        activeImg: 0
    }

    componentDidMount() {
        const { carouselImgs } = this.props;

        const imagesArr = Object.keys(carouselImgs).map(img => carouselImgs[img]);
        this.setState({images: imagesArr })
        this.imgChanges = setInterval(this.changeimg ,2000)
    }

    componentWillUnmount() {
        clearInterval(this.imgChanges);
    }

    changeimg = () => {
        const { images, activeImg } = this.state;
        if(activeImg < images.length - 1) {
            this.setState({activeImg: activeImg + 1})
        } else {
            this.setState({activeImg: 0})
        }
    }

  render() {
    const { images, activeImg } = this.state;

    const carouselIndicators = images.map((img, i) => (
        <div key={i} className="carousel-indicator">
            {i === activeImg ? <div className="carousel-indicator-fill" /> : null}
        </div>
    ))
    return (
      <div className="carousel">
        {images ? <img src={images[activeImg]} alt="food"/> : null}
        <div className="carousel-indicators">
             {carouselIndicators}
        </div>
      </div>
    )
  }
}

export default Carousel;