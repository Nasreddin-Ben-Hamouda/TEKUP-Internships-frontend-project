import img from "../../assets/FrontOffice/img/portfolio/01-large.jpg"
const Image = ({ title }) => {
  return (
    <div className='portfolio-item'>
      <div className='hover-bg'>

        <a
          href={"/"}
          title={title}
          data-lightbox-gallery='gallery1'
        >
          <div className='hover-text'>
            <h4>{title}</h4>
          </div>
          <img
            src={img}
            className='img-responsive'
            alt={title}
          />

        </a>
      </div>
    </div>
  )
}
export default Image;
