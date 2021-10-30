import './DogScroll.css'

const DogScroll = ({offset, setOffset, limit, dogCount}) => {
    const handleClick = (value) => {
        if (value === 'less') setOffset(offset - limit);
        if (value === 'more') setOffset(offset + limit);
        if (value === 'start') setOffset(0);
        if (value === 'end') setOffset(dogCount - limit);
    }
    
    return (
        <div className="dogscroll-main">
            <div className="dogscroll-section">
                <button onClick={() => handleClick('start')} disabled={offset === 0}>{`<<`}</button>
                <button onClick={() => handleClick('less')} disabled={offset - limit <= 0}>{`<`}</button>
            </div>
            <div className="dogscroll-section">
                <button onClick={() => handleClick('more')} disabled={offset + limit >= dogCount}>{`>`}</button>
                <button onClick={() => handleClick('end')} disabled={offset + limit >= dogCount}>{`>>`}</button>
            </div>
        </div>
    )
}

export default DogScroll;
