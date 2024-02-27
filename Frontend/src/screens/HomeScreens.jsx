import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import Product from "../Componets/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../Componets/Loader";
import Message from "../Componets/Message";
import { useParams } from "react-router-dom";
import Paginate from "../Componets/Paginate";

const HomeScreens = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

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
            {data?.products?.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
};

export default HomeScreens;
