import { useState } from "react";
import BookCard from "./components/BookCard";
import { toast } from "react-toastify";
import EditModal from "./components/EditModal";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      toast.warn("Lütfen Kitap İsmi Giriniz", { autoClose: 2000 });

      return;
    }

    const newBook = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    setBooks([...books, newBook]);

    setBookName("");

    toast.success("Kitap Eklendi", { autoClose: 2500 });
  };

  const handleModal = (id) => {
    setDeleteId(id);

    setShowConfirm(true);
  };

  const handleDelete = (deletingId) => {
    const filtred = books.filter((item) => item.id !== deletingId);

    setBooks(filtred);

    toast.error("Kitap Silindi", { autoClose: 2500 });
  };

  const handleRead = (book) => {
    const updatedBook = { ...book, isRead: !book.isRead };

    const cloneBooks = [...books];

    const index = cloneBooks.findIndex((item) => item.id === book.id);

    cloneBooks.splice(index, 1, updatedBook);

    setBooks(cloneBooks);
  };

  const handleEditBook = () => {
    const index = books.findIndex((book) => book.id === editItem.id);

    const cloneBooks = [...books];

    cloneBooks.splice(index, 1, editItem);

    setBooks(cloneBooks);

    setShowEditModal(false);
  };

  return (
    <div>
      <div className="bg-dark text-light px-5 py-2 fs-5 text-center">
        Kitap Kurdu
      </div>
      <div className="container border">
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input
            onChange={(e) => setBookName(e.target.value)}
            value={bookName}
            className="form-control shadow"
            type="text"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

        <div className="d-flex flex-column gap-3 py-5">
          {books.length === 0 && <h4>Henüz herhangi bir kitap eklenmedi</h4>}

          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleModal={handleModal}
              handleRead={handleRead}
              setShowEditModal={setShowEditModal}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>

      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner shadow">
            <h5>Silmek İstiyor musunuz ?</h5>
            <button
              className="btn btn-warning"
              onClick={() => setShowConfirm(false)}
            >
              Vazgeç
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(deleteId);
                setShowConfirm(false);
              }}
            >
              Onayla
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          setEditItem={setEditItem}
          editItem={editItem}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;
