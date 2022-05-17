import Checkbox from 'components/base/checkBox/CheckBox';
import Header from 'components/base/header/Header';
import Title from 'components/base/title/Title';
import PageTitle from 'components/pageTitle/PageTitle';
import PaymentAccount from 'components/paymentAccount/PaymentAccount';
import ShoppingCartItem from 'components/shoppingCartItem/ShoppingCartItem';
import store from 'store/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProductList, getShoppingCartList } from 'utils/api';
import { initProduct, initShoppingCart } from 'actions/actionCreator';

import {
  ContentWrapper,
  PageWrapper,
  ShoppingCartItemContainer,
  PaymentAccountContainer,
  ProductDeleteButton,
  ShoppingCartContainer,
  UnderLine,
} from './style';

const ShoppingCartPage = () => {
  const { shoppingCart } = useSelector(state => state.reducer);

  const getProducts = async () => {
    const productList = await getProductList();
    const shoppingCartList = await getShoppingCartList();
    store.dispatch(initProduct({ products: productList }));
    store.dispatch(initShoppingCart({ shoppingCart: shoppingCartList }));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <PageWrapper>
      <PageTitle title="장바구니" />
      <ContentWrapper>
        <ShoppingCartContainer>
          <Header
            left={<Checkbox label="전체선택" />}
            right={<ProductDeleteButton>상품삭제</ProductDeleteButton>}
          />
          <Title title="든든배송 상품" />
          <ShoppingCartItemContainer>
            {shoppingCart.map(product => (
              <React.Fragment key={product.id}>
                <ShoppingCartItem product={product}></ShoppingCartItem>
                <UnderLine />
              </React.Fragment>
            ))}
          </ShoppingCartItemContainer>
        </ShoppingCartContainer>
        <PaymentAccountContainer>
          <PaymentAccount />
        </PaymentAccountContainer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ShoppingCartPage;
