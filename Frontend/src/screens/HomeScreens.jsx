import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import Product from "../Componets/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../Componets/Loader";
import Message from "../Componets/Message";

const HomeScreens = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreens;
