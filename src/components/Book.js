import React, { useState } from 'react'
import { useQuery } from "@apollo/client";
import { getBookQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const Book = () => {
    const [selected, setSelected] = useState();
    const [arrayPosition, setArrayPosition] = useState(0);
    const { loading, error, data } = useQuery(getBookQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const book = data.book;
    const bookTitle = book.title;
    const bookAuthor = book.author;

    const reducedArray = book.pages.reduce(function (result, value, index, array) {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);

    const renderWord = (clickedPosition, pageIndex) => {
        const getPage = book.pages.find(index => index.pageIndex === pageIndex);
        var word = '';
        getPage.tokens.forEach((element) => {
            if (element.position[0] <= clickedPosition && element.position[1] >= clickedPosition) {
                word = element.value;
            };
            return word;
        });
        setSelected(word);

    }

    const leftPage = generateText(reducedArray[arrayPosition][0]);
    const rightPage = generateText(reducedArray[arrayPosition][1]);
    function generateText(array) {
        const splitContent = [...array.content];
        const splitArray = Array.from(splitContent)
            .map((word, i) => <span key={i} onClick={() => renderWord(i, array.pageIndex)}>{word}</span>)
        return <p key={array.pageIndex}>{splitArray}</p>;
    }

    const toggleNext = () => {
        if (arrayPosition == reducedArray.length - 1) return;
        setArrayPosition(arrayPosition + 1);
    }

    const togglePrev = () => {
        if (arrayPosition == 0) return;
        setArrayPosition(arrayPosition - 1);
    }

    return (
        <div>
            <h2>{bookTitle}</h2>
            <h3>{bookAuthor}</h3>
            <section className="container">
                <div className="left-half">
                    {arrayPosition > 0 ? (
                        <button className="toggle toggle--prev" onClick={togglePrev}>Prev</button>
                    ) : ("")}
                    <article>
                        <p>{leftPage}</p>
                    </article>
                </div>
                <div className="right-half">
                    {arrayPosition < reducedArray.length - 1 ? (
                        <button className="toggle toggle--next" onClick={toggleNext}>Next</button>
                    ) : ("")}
                    <article>
                        <p>{rightPage}</p>
                    </article>
                </div>
            </section>

            {/* <BookDetails word={selected} /> */}
        </div>
    );
};

export default Book;
