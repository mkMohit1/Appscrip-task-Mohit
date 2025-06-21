'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css';

const sortOptions = [
  'RECOMMENDED',
  'NEWEST FIRST',
  'POPULAR',
  'PRICE : HIGH TO LOW',
  'PRICE : LOW TO HIGH',
];

const headings = [
  "Customizable",
  "Ideal For",
  "Occasion",
  "Work",
  "Fabric",
  "Segment",
  "Suitable For",
  "Raw Materials",
  "Pattern"
];

const filterOptions: Record<string, string[]> = {
  "Customizable": [],
  "Ideal For": ["Men", "Women", "Baby & Kids"],
  "Occasion": [],
  "Work": [],
  "Fabric": [],
  "Segment": [],
  "Suitable For": [],
  "Raw Materials": [],
  "Pattern": []
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('RECOMMENDED');
  const [showSidebar, setShowSidebar] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [selectedFilters, setSelectedFilters] = useState<{ [heading: string]: Record<string, boolean> }>({});


  const toggleSortMenu = () => setSortMenuOpen(prev => !prev);
  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setSortMenuOpen(false);
  };

  const toggleSection = (heading: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [heading]: !prev[heading]
    }));
  };

  const toggleOption = (heading: string, option: string) => {
  setSelectedFilters(prev => ({
    ...prev,
    [heading]: {
      ...prev[heading],
      [option]: !prev[heading]?.[option]
    }
  }));
};

const selectAllOptions = (heading: string) => {
  const allOptions = filterOptions[heading].reduce((acc, option) => {
    acc[option] = true;
    return acc;
  }, {} as Record<string, boolean>);

  setSelectedFilters(prev => ({
    ...prev,
    [heading]: allOptions
  }));
};

const unselectAllOptions = (heading: string) => {
  const noneOptions = filterOptions[heading].reduce((acc, option) => {
    acc[option] = false;
    return acc;
  }, {} as Record<string, boolean>);

  setSelectedFilters(prev => ({
    ...prev,
    [heading]: noneOptions
  }));
};


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <main>
      <section className={styles.intro}>
        <h1>DISCOVER OUR PRODUCTS</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque.
          Dolor integer scelerisque nibh amet mi ut elementum dolor.
        </p>
      </section>

      <section className={styles.filterBar}>
        <div className={styles.left}>
          <strong className={styles.showtext1}>3425 ITEMS</strong>
          <strong className={styles.showtext2}>FILTER</strong>
          <span className={styles.showFilter} onClick={() => setShowSidebar(prev => !prev)}>
            <span className={styles.arrow}>{showSidebar ? "<" : ">"}</span>
            <u>{showSidebar ? "HIDE FILTER" : "SHOW FILTER"}</u>
          </span>
        </div>
        <div className={styles.right}>
          <div className={styles.sortWrapper}>
            <div className={styles.sortLabel} onClick={toggleSortMenu}>
              {selectedSort} ▾
            </div>
            {sortMenuOpen && (
              <div className={styles.dropdown}>
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className={`${styles.dropdownItem} ${selectedSort === option ? styles.active : ''}`}
                    onClick={() => handleSortSelect(option)}
                  >
                    {selectedSort === option && <span className={styles.check}>✔</span>}
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className={styles.ProductsContainer}>
        {showSidebar && (
          <section className={styles.sidebarOverlay}>
            <div className={styles.sidebar}>
              {headings.map((heading) => {
                const options = filterOptions[heading];
                const isOpen = expandedSections[heading] ?? true;
                const hasOptions = options.length > 0;

                return (
                  <div key={heading} className={styles.filterSection}>
                    <h4
                      onClick={() => hasOptions && toggleSection(heading)}
                      className={!hasOptions ? styles.disabledHeading : ''}
                    >
                      {heading.toUpperCase()} <span>{hasOptions ? (isOpen ? '▾' : '▸') : '▸'}</span>
                    </h4>
                    
                    {hasOptions && isOpen && (
                      <>
                        <div className={styles.selectActions}>
                          <span className={styles.selectBtn} onClick={() => selectAllOptions(heading)}>All</span>
                          <span className={styles.selectBtn} onClick={() => unselectAllOptions(heading)}>Unselect All</span>
                        </div>
                      {
                        options.map((option) => (
                          <label key={option}>
                            <input type="checkbox"
                              checked={selectedFilters[heading]?.[option] || false}
                              onChange={() => toggleOption(heading, option)}
                            /> {option}
                          </label>
                        ))
                      }
                      </>
                     )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className={styles.grid}>
          {products.map((product: any) => (
            <div key={product.id} className={styles.card}>
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.category}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
