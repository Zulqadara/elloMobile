import React, { useState } from 'react'
// GraphQL Library
import { useQuery } from "@apollo/client";

//Query file
import { getBookQuery } from '../queries/queries';

// File to show word clicked
import BookDetails from './BookDetails/BookDetails';

const Book = () => {
    const [selected, setSelected] = useState(); //Selected word
    const [isOpen, setIsOpen] = useState(false); //Open Modal with word
    const [arrayPosition, setArrayPosition] = useState(0); //Position/index of page in view, used for navigating and fetching from reducedArray
    const { loading, error, data } = useQuery(getBookQuery); //GraphQL query

    // Load GraphQL objects, display loading Gif while loading
    if (loading) return <p><img className='gif' src="https://i.gifer.com/TEzQ.gif" alt="Loading Gif" /></p>;
    if (error) return <p>Error :(</p>;

    // save fetched API data object in respective variable
    const book = data.book;
    const bookTitle = book.title;
    const bookAuthor = book.author;

    // Split API data in pairs
    const reducedArray = book.pages.reduce(function (result, value, index, array) {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);

    // Divide content in left and right page on view
    const leftPage = generateText(reducedArray[arrayPosition][0]);
    const rightPage = generateText(reducedArray[arrayPosition][1]);

    // Split content into arrays and get position of character clicked
    function generateText(array) {
        const splitContent = [...array.content];
        const splitArray = Array.from(splitContent)
            .map((word, i) => <span key={i} onClick={() => renderWord(i, array.pageIndex)}>{word}</span>)
        return <p key={array.pageIndex}>{splitArray}</p>;
    }

    // Get the position of character clicked and map it to tokens via page index
    // Calculate if the clicked positions value is between the tokens positions array, if yes get the word from token
    const renderWord = (clickedPosition, pageIndex) => {
        const getPage = book.pages.find(index => index.pageIndex === pageIndex);
        var word = '';
        getPage.tokens.forEach((element) => {
            if (element.position[0] <= clickedPosition && element.position[1] >= clickedPosition) {
                word = element.value;
            };
            return word;
        });
        setSelected(word); // Set the rendered word into a state
        setIsOpen(true); // Activate Modal to display word clicked
    }

    // When clicked shows the next set of content from the splitted pairs array (reducedArray)
    const toggleNext = () => {
        if (arrayPosition === reducedArray.length - 1) return;
        setArrayPosition(arrayPosition + 1);
    }

    // When clicked shows the previous set of content from the splitted pairs array (reducedArray)
    const togglePrev = () => {
        if (arrayPosition === 0) return;
        setArrayPosition(arrayPosition - 1);
    }

    return (
        <div>
            <h2>{bookTitle}</h2>
            <h3>{bookAuthor}</h3>
            {/* Display Modal when state is changed to isOpen and pass selected word as prop */}
            {isOpen && <BookDetails setIsOpen={setIsOpen} word={selected} />}
            <section className="container">
                <div className="left-half">
                    {/* If page in view is less than 0 in the (reducedArray) the prev button hides */}
                    {arrayPosition > 0 ? (
                        <button className="toggle toggle--prev" onClick={togglePrev}>Prev</button>
                    ) : ("")}
                    <article>
                        {leftPage}
                    </article>
                </div>
                <div className="right-half">
                    {/* If page in view is more than the split(reducedArray) length the next button hides */}
                    {arrayPosition < reducedArray.length - 1 ? (
                        <button className="toggle toggle--next" onClick={toggleNext}>Next</button>
                    ) : ("")}
                    <article>
                        {rightPage}
                    </article>
                </div>
            </section>
        </div>
    );
};

export default Book;
