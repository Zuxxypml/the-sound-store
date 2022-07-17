import React from "react";
import Link from "next/link";
import { urlFor } from "../../lib/client";

const SliderProduct = ({ product: { name, price, slug, image } }) => {
  return (
    <div>
      <Link href={`${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            alt={name}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">₦{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default SliderProduct;
