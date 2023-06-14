import { useEffect, useState } from "react"
import './Carousel.css'

const Carousel = () =>{

    const data = ["To practice any art, no matter how well or badly, is a way to make your soul grow. So do it.", "Every artist dips his brush in his own soul, and paints his own nature into his pictures.","Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen."]
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselInfiniteScroll = () => {
        if (currentIndex === data.length-1){
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex + 1)
    }
    useEffect( ()=> {
        const interval =  setInterval(()=> {carouselInfiniteScroll()},3000)
        return () => clearInterval(interval)
    })

    return (
        <div className="carousel-container">
            {data.map((item, index)=> {
                return <h1 className="carousel-item" 
                style={{transform: `translate(-${currentIndex * 100}%)`}}
                key={index}>{item} 
                </h1>
            })}
        </div>
    )
}
export default Carousel