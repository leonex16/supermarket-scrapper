export const Home = () => (
  <article className="search-box">
    <i className="search-box__icon ri-search-line" />
    <label className="search-box__label" htmlFor="search-product" >Busca y escoje la mejor opción...</label>
    <input
      className="search-box__input"
      type="search"
      name="search-product"
      id="search-product"
      placeholder="Busca y escoje la mejor opción..."
    />
  </article>
)
