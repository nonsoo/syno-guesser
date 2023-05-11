import styles from '../../styles/Bookmarks.module.css';

const bookmarks = [
  {
    id: 1,
    word: 'Book',
    synonyms: ['Novel', 'Fiction', 'Softcover'],
  },
  {
    id: 2,
    word: 'Screen',
    synonyms: ['Picture', 'Comics', 'Movie'],
  },
  {
    id: 3,
    word: 'Screen',
    synonyms: ['Picture', 'Comics', 'Movie'],
  },
];

const bookmarkModal = () => {
  return (
    <>
      <p className={styles.Modal__Title}>Bookmarks</p>
      <ul>
        {bookmarks.map(bookmark => (
          <li key={bookmark.id}>
            <button
              className={styles.bookmarkAccordion}
              onClick={e => {
                e.currentTarget.classList.toggle('active');
                const panel = e.currentTarget.nextElementSibling as HTMLElement;

                if (!panel) return;

                if (panel.style.display === 'block') {
                  panel.style.display = 'none';
                } else {
                  panel.style.display = 'block';
                }
              }}
            >
              {bookmark.word}
            </button>
            <div className={styles.bookmarkPanel}>
              <p>{bookmark.synonyms.join(', ')}.</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default bookmarkModal;
