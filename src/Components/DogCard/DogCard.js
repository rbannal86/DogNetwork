import './DogCard.css'

const DogCard = ({name, breed, age, images, sex}) => {
    return(
        <div className="dogcard-main">
            <img src={images[0].url} alt={`${name}`} className="dogcard-image"/>
            <div className="dogcard-info">
                <div>{name}</div>
                <div>{breed}</div>
                <div>{age}</div>
                <div>{sex}</div>
            </div>
        </div>
    )
}

export default DogCard;
