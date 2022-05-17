import "./BookDetails.css";

const BookDetails = ({ word, setIsOpen }) => {
    // Get an array of images
    const cartoonImages = [
        require('./img/monkey.png'),
        require('./img/fireman2.png'),
        require('./img/pencil.png'),
        require('./img/pencil2.png'),
        require('./img/pencil3.png'),
    ];

    // Randomize image to display when a user clicked on a word in parent view
    const randomImage = cartoonImages[Math.floor(Math.random() * cartoonImages.length)];
    let displayWord;
    if (word) {
        displayWord = word;
    }
    return (
        <>

            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Selected Word</h5>
                    </div>
                    <div className="modalContent">
                        {displayWord}
                    </div>
                    <div className="modalImage">
                        <img src={randomImage} alt="modalImage" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookDetails;