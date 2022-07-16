import React from "react";
import { Product, HeroBanner, FooterBanner } from "../components";
import { client } from "../lib/client";

const Home = ({ products, banners }) => {
  return (
    <div>
      <HeroBanner heroBanner={banners.length && banners[0]} />
      {console.log(banners)}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Variation of sound quality</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banners.length && banners[0]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(bannerQuery);
  return {
    props: {
      products,
      banners,
    },
  };
};

export default Home;
