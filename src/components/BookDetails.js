const BookDetails = ({ word }) => {
    let displayWord;
    if(word){
        displayWord = word;
    }
    // const { loading, data } = useQuery(getBookQuery, {
    //     variables: { id: bookId }
    // });
    // let display;
    // if (bookId) {
    //     if (loading) {
    //         display = <div>loading</div>;
    //     } else {
    //         const { book } = data;
    //         display = (
    //             <div>
    //                 <h2>{book.name}</h2>
    //                 <p>{book.genre}</p>
    //                 <p>{book.author.name}</p>
    //                 <p>All books by this author:</p>
    //                 <ul className="other-books">
    //                     {book.author.books.map((item) => {
    //                         return <li key={item.id}>{item.name}</li>;
    //                     })}
    //                 </ul>
    //             </div>
    //         );
    //     }
    // }else{
    //     display = <div>No Books Selected...</div>;
    // }
    return (
        <div id="book-details">
            {displayWord}
        </div>
    );
};

export default BookDetails;